'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';
import * as notifier from 'notifier';

import { loadTemplate } from 'template';
import { dataValidator } from 'dataValidator';

const $navElement = $('#nav-panel');

function logedPanel() {
    loadTemplate('nav-loged.html')
        .then((htmlTemplate) => {
            $navElement.html(htmlTemplate);
        });
}

function welcomePanel() {
    loadTemplate('nav-welcome.html')
        .then((htmlTemplate) => {
            $navElement.html(htmlTemplate);
        });
}

export { welcomePanel, logedPanel }