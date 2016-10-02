/* globals FileReader, localStorage */

'use strict';

import $ from 'jquery';

import handlebars from 'handlebars';
import * as notifier from 'notifier';
import { storage } from 'storage';
import * as homeService from 'homeService';
import { loadTemplate } from 'template';
import { dataValidator } from 'dataValidator';
// import { uploadImage } from 'utils';

const $containerElement = $('#container'),
    $containerLeftElement = $('#container-left'),
    USER_ID = 'x-user-id';


function generateHome() {
    homePanel().then(() => {
        let image = '';

        $('#post-img').on('click', function() {
            console.log("called img btn");
            
            notifier.notifySuccess('YOU DID IT');

            if (this.files && this.files[0]) {
                notifier.notifySuccess('YOU DID IT Again');
                
                var imageReader = new FileReader();
                imageReader.onload = function(e) {
                    console.log(e);
                    notifier.notifySuccess('YOU DID IT Again');
                    
                    if(e.total <= 5000) {
                        image = '' + e.target.result;
                    }
                    else{
                        notifier.notifyError("Picture must be lower than 50kb!");
                    }
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

        updatePostFeed();
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

function getAllPost() {
    loadTemplate('post-feed.html')
        .then((htmlTemplate) => {

            homeService.getAllPost().then((data) => {
                let feedData = {
                    data: data 
                };
                let templateFunc = handlebars.compile(htmlTemplate);
                let html = templateFunc(feedData);
                $('.post-feed').html(html);
            });
        });
}

function getPost() {
    loadTemplate('post-feed.html')
        .then((htmlTemplate) => {
            let currentPost = storage.getItem('post-possition') | 0;

            homeService.getPost(currentPost).then((data) => {

                if(data.length === 0){
                    notifier.notifyError('No more posts...');
                    
                    return;
                }
                notifier.notifySuccess('LOADING...');
                
                console.log(data.length);
                let feedData = {
                    data: data 
                };
                let templateFunc = handlebars.compile(htmlTemplate);
                let html = templateFunc(feedData);
                console.log(html);
                $('.post-feed').append(html);
            });
        });
}

function updatePostFeed() {
    $('.post-feed').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            getPost();
        }
    });

}

export { generateHome, getPost, profilePanel, leftSidePanel, editProfilePanel };