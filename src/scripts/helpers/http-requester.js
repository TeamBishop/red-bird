'use strict';

import $ from 'jquery';

function makeRequest(url, method, options) {
    options = options || {};
    options.headers = options.headers || {};
    method = method || 'GET';
    let data = options.data || {};

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: method,
            headers: options.headers,
            data: data,
            success: resolve,
            error: reject
        });
    });
}

function getJSON(url, options) {
    options = options || {};
    options.headers.contentType = 'application/json';
    return makeRequest(url, 'GET', options);
}

function postJSON(url, options) {
    options = options || {};
    options.headers.contentType = 'application/json';
    return makeRequest(url, 'POST', options);
}

function get(url, options) {
    return makeRequest(url, 'GET', options);
}

function post(url, options) {
    return makeRequest(url, 'POST', options);
}

function put(url, options) {
    return makeRequest(url, 'PUT', options);
}

export { getJSON, postJSON, get, post, put };