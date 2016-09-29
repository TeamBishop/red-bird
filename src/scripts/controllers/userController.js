'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';

import * as userService from 'userService';
import { loadTemplate } from 'template';

function logIn() {
    $('#nav-panel').hide();

    loadTemplate('log-in.html')
        .then((htmlTemplate) => {
            let template = handlebars.compile(htmlTemplate);

        });
}