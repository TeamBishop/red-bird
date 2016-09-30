/* globals localStorage */

'use strict';

import $ from 'jquery';

import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl } from 'appConstants';
import { getBase64Code } from 'utils';

const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret),
    AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id';

function signUp(username, password, email) {
    let url = baseServiceUrl + '/user/' + appCredentials.appKey;
    let headers = {
        'Authorization': BASE_AUTH_CODE
    };
    let userData = {
        username,
        password,
        email
    };

    return new Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
                headers: headers,
                data: userData
            })
            .then((responseData) => {
                localStorage.setItem(USER_ID, responseData._id);
                localStorage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
                resolve({
                    username: responseData.username
                });
            }, (error) => {
                reject(error);
            });
    });
}

function logIn(username, password) {
    let url = baseServiceUrl + '/user/' + appCredentials.appKey + '/login';
    let headers = {
        'Authorization': BASE_AUTH_CODE
    };
    let userData = {
        username,
        password
    };

    return new Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
                headers: headers,
                data: userData
            })
            .then((responseData) => {
                localStorage.setItem(USER_ID, responseData._id);
                localStorage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
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
        'Authorization': 'Kinvey' + ' ' + localStorage.getItem(AUTH_TOKEN_KEY)
    };

    return new Promise((resolve, reject) => {
        httpRequester.post(url, {
                headers: headers
            })
            .then((responseData) => {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                localStorage.setItem(USER_ID, responseData._id);
                resolve();
            }, (error) => {
                reject(error);
            });
    });
}

function hasLoggedInUser() {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
}

export {
    signUp,
    logIn,
    logOut,
    hasLoggedInUser
};