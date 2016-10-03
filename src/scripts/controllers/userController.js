'use strict';

import $ from 'jquery';
import * as notifier from 'notifier';

import * as userService from 'userService';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';

const $containerElement = $('#container');

function signUpUser(context) {
    loadTemplate('signup.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
            $('#btn-signup').on('click', function() {
                let userData = {
                        username: $('#tb-username-signup').val(),
                        password: $('#tb-password-signup').val(),
                        email: $('#tb-email-signup').val()
                    },
                    profileData = {
                        firstname: $('#tb-firstname-signup').val(),
                        lastname: $('#tb-lastname-signup').val()
                    };

                userService.signUp(userData)
                    .then((responseData) => {
                        profileService.saveProfile(profileData)
                            .then((resp) => {
                                context.redirect('#/');
                                notifier.notifySuccess('Signed up');
                            }, (error) => {
                                console.log(error);
                            });
                    }, (error) => {
                        notifier.notifyError(error.message || 'Invalid data');
                    });
            });
        });
}

function logInUser(context) {
    loadTemplate('login.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
            $('#btn-login').on('click', function() {
                let userData = {
                    username: $('#tb-username-login').val(),
                    password: $('#tb-password-login').val()
                };

                userService.logIn(userData)
                    .then((responseData) => {
                        context.redirect('#/');
                        notifier.notifySuccess('Logged in');
                    }, (error) => {
                        notifier.notifyError(error.message || 'Invalid credentials');
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

export { signUpUser, logInUser, logOutUser };