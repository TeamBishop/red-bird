'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';
import * as myPostService from 'myPostService';

import * as notifier from 'notifier';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';
import { storage } from 'storage';

const AUTH_TOKEN_KEY = 'x-auth-token',
    USER_ID = 'x-user-id',
    PROFILE_ID = 'x-profile-id';

function loadCurrentUserPosts() {
    loadTemplate('post-feed.html')
        .then((htmlTemplate) => {

            myPostService.getUserPost()
                .then((data) => {
                    console.log(data);
                    
                    let userPosts = {
                            data: data
                        },
                        template = handlebars.compile(htmlTemplate),
                        html = template(userPosts);                      
                        
                    $('#container').html(html);
                });
        });
}

export {loadCurrentUserPosts};
