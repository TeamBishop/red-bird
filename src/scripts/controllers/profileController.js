/* globals FileReader */

'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';

import * as notifier from 'notifier';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';
import { storage } from 'storage';
import { uploadImage } from 'utils';

const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id',
    PROFILE_ID = 'x-profile-id';

function loadProfile(context) {
    loadTemplate('profile-template.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);

            profileService.getByUserId(storage.getItem(USER_ID))
                .then((responseData) => {
                    $('#container').html(template(responseData[0]));
                    storage.setItem(PROFILE_ID, responseData[0]._id);
                });
        });
}

function updateProfile(context) {
    loadTemplate('edit-profile.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);

            profileService.getByUserId(storage.getItem(USER_ID))
                .then((responseData) => {
                    $('#container').html(template(responseData[0]));
                    storage.setItem(PROFILE_ID, responseData[0]._id);
                    let image = '';

                    $('#image-upload').on('change', function() {
                        if (this.files && this.files[0]) {
                            var imageReader = new FileReader();
                            imageReader.onload = function(e) {
                                if (e.total <= 50000) {
                                    image = '' + e.target.result;
                                    notifier.notifySuccess('Picture uploaded');
                                } else {
                                    notifier.notifyError("Picture must be lower than 50kb!");
                                }
                            };
                            imageReader.readAsDataURL(this.files[0]);
                        }
                    });

                    $('#btn-save-info').on('click', function() {
                        let data = {
                            avatarSrc: image,
                            firstname: $('#firstname-field').val(),
                            lastname: $('#lastname-field').val(),
                            job: $('#department-field').val(),
                            location: {
                                city: $('#city-field').val(),
                                country: $('#country-field').val(),
                            },
                            birthday: $('#birthday-field').val(),
                        };
                        console.log(data);
                        profileService.updateProfile(data, storage.getItem(PROFILE_ID))
                            .then((resolve, reject) => {
                                loadSidePanel();
                                context.redirect('#/profile');
                            });
                    });

                });
        });
}

function loadSidePanel(context) {
    loadTemplate('profile-side-panel.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);

            profileService.getByUserId(storage.getItem(USER_ID), storage.getItem(PROFILE_ID))
                .then((responseData) => {
                    $('#container-left').html(template(responseData[0]));
                });
        });
}

export { loadProfile, updateProfile, loadSidePanel };