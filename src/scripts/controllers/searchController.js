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
        });

    $('#btn-search').on('click', function() {
        let searchedName = $('#search-field').val();
        loadTemplate('search-user-result.html')
            .then((htmlTemplate) => {
                let template = handlebars.compile(htmlTemplate);

                profileService.getByName(searchedName)
                    .then((responseData) => {
                        $('#container').html(template(responseData));
                    });
            });
    });
}

export { searchUsers };