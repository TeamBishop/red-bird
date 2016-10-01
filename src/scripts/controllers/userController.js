'use strict';

import $ from 'jquery';
import * as notifier from 'notifier';

import * as userService from 'userService';
import { loadTemplate } from 'template';
import { dataValidator } from 'dataValidator';

const $containerElement = $('#container');

function signUpUser(context) {
    loadTemplate('signup.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
            $('#btn-signup').on('click', function() {
                let username = $('#tb-username-signup').val();
                let password = $('#tb-password-signup').val();
                let email = $('#tb-email-signup').val();

                if (!isValidUsername(username)) {
                    return;
                }

                if (!isValidPassword(password)) {
                    return;
                }

                userService.signUp(username, password, email)
                    .then((responseData) => {
                        context.redirect('#/');
                        notifier.notifySuccess('Signed up');
                    }, (error) => {
                        notifier.notifyError('Username is already used');
                    });
            });
        });
}

function logInUser(context) {
    loadTemplate('login.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
            $('#btn-login').on('click', function() {
                let username = $('#tb-username-login').val();
                let password = $('#tb-password-login').val();

                if (!isValidUsername(username)) {
                    return;
                }

                if (!isValidPassword(password)) {
                    return;
                }

                userService.logIn(username, password)
                    .then((responseData) => {
                        context.redirect('#/');
                        notifier.notifySuccess('Logged in');
                    }, (error) => {
                        notifier.notifyError('Incorrect username or password');
                    });
            });
        });
}

function logOutUser(context) {
    userService.logOut()
        .then((responseData) => {
            context.redirect('#/');
            notifier.notifySuccess('Logged out');
        });
}

function isValidUsername(username) {
    if (dataValidator.stringValidation.isEmpty(username)) {
        notifier.notifyError('Username is required');
        return false;
    }

    // TODO: Use constants!!!
    if (!dataValidator.stringValidation.isLengthInRange(username, 3, 20)) {
        notifier.notifyError('Username must be between ' + 3 + ' and ' + 20 + ' characters long!');
        return false;
    }

    return true;
}

function isValidPassword(password) {
    if (dataValidator.stringValidation.isEmpty(password)) {
        notifier.notifyError('Password is required!');
        return false;
    }

    return true;
}

export { signUpUser, logInUser, logOutUser };