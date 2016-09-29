/* globals localStorage */

'use strict';

import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl } from 'appConstants';
import { getBase64Code } from 'utils';
import $ from 'jquery';

const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret),
    AUTH_TOKEN_KEY = 'auth-token';

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

    httpRequester.postJSON(url, {
            headers: headers,
            data: userData
        })
        .then((responseData) => {
            localStorage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
            return {
                username: responseData.username
            };
        }, (error) => {
            return error;
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

    httpRequester.postJSON(url, {
            headers: headers,
            data: userData
        })
        .then((responseData) => {
            localStorage.setItem(AUTH_TOKEN_KEY, responseData._kmd.authtoken);
            return {
                username: responseData.username
            };
        }, (error) => {
            return error;
        });
}

function logOut() {
    let url = baseServiceUrl + '/user/' + appCredentials.appKey + '/_logout';
    let headers = {
        'Authorization': 'Kinvey' + ' ' + localStorage.getItem(AUTH_TOKEN_KEY)
    };

    httpRequester.post(url, {
            headers: headers
        })
        .then((responseData) => {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }, (error) => {
            return error;
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