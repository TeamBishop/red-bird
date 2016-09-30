'use strict';

import $ from 'jquery';

import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl, baseAppDataUrl } from 'appConstants';
import { getBase64Code } from 'utils';

const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret),
    AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id';


function createPost(userID, content) {
    let url = baseServiceUrl + baseAppDataUrl + appCredentials.appKey + '/feed-data',
        headers = {
            'Authorization': 'Kinvey ' + localStorage.getItem(AUTH_TOKEN_KEY),
            //'Content-Type': 'application/json'
        },
        postData = {
            user: userID,
            content: content
        };

    return new Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
            headers: headers,
            data: postData
        }).then((responseData) => {
            resolve(responseData);
        },(error) => {
            reject(error);
        });
    });
}


export { createPost };