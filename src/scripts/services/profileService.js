'use strict';

import * as httpRequester from 'httpRequester';
import { baseServiceUrl } from 'appConstants';

const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id';

function saveProfile(data) {
    data = data || {};

    let url = baseServiceUrl + '/appdata/' + appCredentials.appKey + '/profiles';
    let headers = {
        'Authorization': localStorage.getItem(AUTH_TOKEN_KEY)
    };
    data.userId = localStorage.getItem(USER_ID);

    return Promise((resolve, reject) => {
        httpRequester.postJSON(url, {
                headers: headers,
                data: data
            })
            .then((responseData) => {
                resolve(responseData);
            }, (error) => {
                reject(error);
            });
    });
}

function updateProfile(data, profileId) {
    data = data || {};

    let url = baseServiceUrl + '/appdata/' + appCredentials.appKey + '/profiles' + profileId;
    let headers = {
        'Authorization': localStorage.getItem(AUTH_TOKEN_KEY)
    };
    data.userId = localStorage.getItem(USER_ID);

    return Promise((resolve, reject) => {
        httpRequester.put(url, {
                contentType: 'application/json',
                headers: headers,
                data: data
            })
            .then((responseData) => {
                resolve(responseData);
            }, (error) => {
                reject(error);
            });
    });
}

function getByUserId(userId) {
    let queryParam = {
        userId: userId
    };

    return makeQuery(JSON.stringify(queryParam));
}

function getByName(name) {
    let nameTokens = name.split(' ');
    let queryString;
    if (nameTokens.length === 1) {
        queryString = '{"$or":[{"firstName":' + name + ', "lastName":' + name + '}]}';
    } else if (nameTokens.length === 2) {
        queryString = '{"$and":[{"firstName":' + name + ', "lastName":' + name + '}]}';
    } else {
        queryString = '{}';
    }

    return makeQuery(queryString);
}

function makeQuery(queryString) {
    let url = baseServiceUrl + '/appdata/' + appCredentials.appKey + '/profiles/?query=' + queryString;
    let headers = {
        'Authorization': localStorage.getItem(AUTH_TOKEN_KEY)
    };

    return new Promise((resolve, reject) => {
        httpRequester.getJSON(url, {
                headers: headers
            })
            .then((responseData) => {
                resolve(responseData)
            }, (error) => {
                reject(error);
            });
    });
}

export {
    saveProfile,
    updateProfile,
    getByName,
    getByUserId
};