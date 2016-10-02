'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';

import * as notifier from 'notifier';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';
import { storage } from 'storage';

const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id';

function loadProfile(context) {
    loadTemplate('profile-template.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);

            profileService.getByUserId(storage.getItem(USER_ID))
                .then((responseData) => {
                    $('#container').html(template(responseData[0]));
                });
        });
}

function updateProfile(context) {
    loadTemplate('profile-template.html')
        .then((htmlTemplate) => {
            $('#container').html(htmlTemplate);


        });
}

function loadSidePanel(context) {
    loadTemplate('profile-side-panel.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);
            console.log(htmlTemplate);
            console.log(template);

            profileService.getByUserId(storage.getItem(USER_ID))
                .then((responseData) => {
                    console.log(responseData);
                    $('#container-left').html(template(responseData[0]));
                });
        });
}

export { loadProfile, updateProfile, loadSidePanel };