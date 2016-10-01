'use strict';

import $ from 'jquery';

import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl } from 'appConstants';
import { getBase64Code } from 'utils';
import { dataValidator } from 'dataValidator';
import { storage } from 'storage';

const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret),
    AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id',
    USERNAME_MIN_LENGTH = 3,
    USERNAME_MAX_LENGTH = 20;

function signUp(userData) {
    if (!dataValidator.isValidName(userData.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)) {
        return Promise.reject({
            message: 'Invalid username'
        });
    }

    if (!dataValidator.isValidEmail(userData.email)) {
        return Promise.reject({
            message: 'E-mail contains invalid characters'
        });
    }

    let url = baseServiceUrl + '/user/' + appCredentials.appKey;
    let headers = {
        'Authorization': BASE_AUTH_CODE
    };

    return new Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
                headers: headers,
                data: userData
            })
            .then((responseData) => {
                storage.setItem(USER_ID, responseData._id);
                storage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
                resolve({
                    username: responseData.username
                });
            }, (error) => {
                reject(error);
            });
    });
}

function logIn(userData) {
    if (!dataValidator.isValidName(userData.username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)) {
        return Promise.reject({
            message: 'Invalid username'
        });
    }

    let url = baseServiceUrl + '/user/' + appCredentials.appKey + '/login';
    let headers = {
        'Authorization': BASE_AUTH_CODE
    };

    return new Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
                headers: headers,
                data: userData
            })
            .then((responseData) => {
                storage.setItem(USER_ID, responseData._id);
                storage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
                resolve({
                    username: responseData.username
                });
            }, (error) => {
                reject(error);
            });
    });
}

function logOut() {
    let url = baseServiceUrl + '/user/' + appCredentials.appKey + '/_logout';
    let headers = {
        'Authorization': 'Kinvey' + ' ' + storage.getItem(AUTH_TOKEN_KEY)
    };

    return new Promise((resolve, reject) => {
        httpRequester.post(url, {
                headers: headers
            })
            .then((responseData) => {
                storage.removeItem(AUTH_TOKEN_KEY);
                storage.removeItem(USER_ID);
                resolve();
            }, (error) => {
                reject(error);
            });
    });
}

function hasLoggedInUser() {
    return storage.getItem(AUTH_TOKEN_KEY) !== null;
}

export {
    signUp,
    logIn,
    logOut,
    hasLoggedInUser
};