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
    //     loadTemplate('post-feed.html')
    //         .then((htmlTemplate)=>{

    //             //console.log(someObj[0]._id);
    //             console.log(htmlTemplate);

    //             let templateFunc = handlebars.compile(htmlTemplate);
    //             console.log(templateFunc());

    //             let html = templateFunc(someObj);
    //             //console.log(html);

    //             // $("#container").html(html);
    //             $('.post-feed').html(html);
    //         });
}

export { generateHome, getAllPost, profilePanel, leftSidePanel, editProfilePanel };