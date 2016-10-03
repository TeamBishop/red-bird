'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';

import * as notifier from 'notifier';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';
import { storage } from 'storage';

const USER_ID_KEY = 'x-user-id';

function searchUsers() {
    loadTemplate('search.html')
        .then((htmlTemplate) => {
            return $('#container').html(htmlTemplate);
        })
        .then(() => {
            $('#btn-search').on('click', function() {
                loadTemplate('search-user-result.html')
                    .then((htmlTemplate) => {
                        let searchedName = $('#search-field').val();
                        let template = handlebars.compile(htmlTemplate);
                        profileService.getByName(searchedName)
                            .then((responseData) => {
                                if (0 === responseData.length) {
                                    return Promise.reject('No results');
                                }

                                return Promise.resolve($('#search-results').html(template({ profiles: responseData })));
                            })
                            .then(() => {
                                $('#search-results').on('click', 'a.btn-follow', function() {
                                    let followingId = $(this).parents('.search-result').attr('data-id');
                                    let addFollowingPromise = profileService.addFollowing(storage.getItem(USER_ID_KEY), followingId);
                                    let addFollowerPromise = profileService.addFollower(followingId, storage.getItem(USER_ID_KEY));
                                    Promise.all(addFollowingPromise, addFollowerPromise)
                                        .then((suc) => {
                                            console.log('Added');
                                            console.log(suc);
                                        }, (err) => {
                                            console.log('Not added');
                                            console.log(err);
                                        });
                                });
                            }, (error) => {
                                notifier.notifyError(error);
                            })

                    });
            });
        });
}

export { searchUsers };