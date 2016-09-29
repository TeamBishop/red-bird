'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';
import notifier from 'notifier';

import * as userService from 'userService';
import { loadTemplate } from 'template';
import dataValidator from 'dataValidator';

const $containerElement = $('#container');

function authorize() {
    $('#nav-panel').hide();

    loadTemplate('authorize.html')
        .then((htmlTemplate) => {
            $containerElement.append(htmlTemplate);
        });
}

function logInUser() {
    $('#btn-login').on('click', function() {
        let username = $('#tb-username-login').val();
        let password = $('#tb-password-login').val();

        if (dataValidator.stringValidation.isEmpty(username) ||
            dataValidator.stringValidation.isEmpty(password)) {
            notifier.notifyError('Username and password required to log in!');
            return;
        }

        // TODO: Use constants!!!
        if (!dataValidator.stringValidation.isLengthInRange(username, 3, 20)) {
            notifier.notifyError('Username must be between ' + 3 + ' and ' + 20 + ' characters long!');
            return;
        }

        // TODO: Check password!!!

        userService.logIn(username, password)
            .then((responseData) => {
                // Redirect
                notifier.notifySuccess('Logged in');
            }, (error) => {
                console.log(error);
                notifier.notifyError('Greshka');
            });
    });
}

function logOutUser() {

}

export { authorize };