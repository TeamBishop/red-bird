'use strict';

import $ from 'jquery';

//import { getByUserId } from 'profileService';
import * as httpRequester from 'httpRequester';
import { appCredentials, baseServiceUrl, baseAppDataUrl } from 'appConstants';


//const BASE_AUTH_CODE = 'Basic' + ' ' + getBase64Code(appCredentials.appKey + ':' + appCredentials.appSecret),
const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id';

function getUserPost(){
    let path = '/feed-data/',
        user = '?query={ "_acl": {"creator":"' + localStorage.getItem(USER_ID) + '"}}',
        sort = '&&?query={}&sort={"_kmd":-1}',
        url = baseServiceUrl + '/appdata/' + appCredentials.appKey + path + user + sort,
        headers = {
            'Authorization':'Kinvey ' +  localStorage.getItem(AUTH_TOKEN_KEY)
        };

    return new Promise((resolve, reject) => {
        httpRequester.getJSON(url, {
            headers: headers
        })
        .then((responseData) => {
            resolve(responseData);
        }, (error) => {
            reject(error);
        });
    });    
}

export { getUserPost };