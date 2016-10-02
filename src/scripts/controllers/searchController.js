'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';

import * as notifier from 'notifier';
import * as profileService from 'profileService';
import { loadTemplate } from 'template';
import { storage } from 'storage';

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
                                return Promise.resolve($('#search-results').html(template({ profiles: responseData })));
                            })
                            .then(() => {
                                $('#search-results').on('click', 'a.btn-follow', function() {
                                    // console.log($(this).parents('search-result'));
                                });
                            });
                    });
            });
        });
}

export { searchUsers };