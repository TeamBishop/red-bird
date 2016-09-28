'use strict';

import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl } from 'appConstants';
import { getBase64Code } from 'utils';
import $ from 'jquery';

const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret);

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

    return httpRequester.postJSON(url, {
        headers: headers,
        data: userData
    });
}

function logIn() {

}

function logOut() {

}

function hasLoggedInUser() {

}

export {
    signUp,
    logIn,
    logOut,
    hasLoggedInUser
};