'use strict';

import $ from 'jquery';

import handlebars from 'handlebars';
import * as notifier from 'notifier';

import * as homeService from 'homeService';
import { loadTemplate } from 'template';
import { dataValidator } from 'dataValidator';

const $containerElement = $('#container'),
    $containerLeftElement = $('#container-left'),
    USER_ID = 'x-user-id';


function generateHome() {
    homePanel().then(() => {
        let image = 'null';

        $('#post-img').on('change', function() {
            if (this.files && this.files[0]) {
                var imageReader = new FileReader();
                imageReader.onload = function(e) {
                    image = '' + e.target.result;
                };
                imageReader.readAsDataURL(this.files[0]);
            }
        });

        console.log('loadded');

        $('#post-btn').on('click', function() {
            let username = localStorage.getItem(USER_ID),
                message = $('#post-context').val(),
                context = {
                    message: message,
                    image: image
                };

            $('#post-context').val('');

            // Must add some kind of validation !

            homeService
                .sendPost(username, context)
                .then((responseData) => {
                    console.log(responseData);

                }, (error) => {
                    console.log(error);
                });
        });
    });
}


function homePanel() {
    return loadTemplate('news-feed.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
        });
}

function profilePanel() {
    loadTemplate('profile-template.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
        });
}

function leftSidePanel() {
    loadTemplate('profile-side-panel.html')
        .then((htmlTemplate) => {
            $containerLeftElement.html(htmlTemplate);
        });
}

function editProfilePanel() {
    loadTemplate('profile.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
        });
}

// BETA VERSION - DOESN'T WORK CORRECT!
function getAllPost() {
    loadTemplate('post-feed.html')
        .then((htmlTemplate) => {
            let someObj = {
                data: [{
                    "_id": "57eeaae536d8236c159d547f",
                    "user": "57ee720e636f8a2d0e3b9da7",
                    "content": {
                        "message": "And....."
                    },
                    "_acl": {
                        "creator": "57ee720e636f8a2d0e3b9da7"
                    },
                    "_kmd": {
                        "lmt": "2016-09-30T18:11:49.020Z",
                        "ect": "2016-09-30T18:11:49.020Z"
                    }
                }, {
                    "_id": "57eeac2ae40d77896e634637",
                    "user": "57ee45eb98206aa20c5414dc",
                    "content": {
                        "message": ""
                    },
                    "_acl": {
                        "creator": "57ee45eb98206aa20c5414dc"
                    },
                    "_kmd": {
                        "lmt": "2016-09-30T18:17:14.348Z",
                        "ect": "2016-09-30T18:17:14.348Z"
                    }
                }]
            };

            let templateFunc = handlebars.compile(htmlTemplate);
            console.log(templateFunc(someObj));

            let html = templateFunc(someObj);
            //console.log(html);

            // $("#container").html(html);
            $('.post-feed').html(html);
        });
}

export { generateHome, getAllPost, profilePanel, leftSidePanel, editProfilePanel };