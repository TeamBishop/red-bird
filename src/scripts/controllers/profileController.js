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
    loadTemplate('edit-profile.html')
        .then((htmlTemplate) => {
            $('#container').html(htmlTemplate);

            $('#btn-save-info').on('click', function() {
                let image = '';
                if (this.files && this.files[0]) {
                    var imageReader = new FileReader();
                    imageReader.onload = function(e) {
                        if (e.total <= 5000) {
                            image = '' + e.target.result;
                        } else {
                            notifier.notifyError("Picture must be lower than 50kb!");
                        }
                    };
                    imageReader.readAsDataURL(this.files[0]);
                }

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

                profileService.updateProfile(data)
                    .then((resolve, reject) => {
                        console.log('Saved!');
                    });
            });
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