'use strict';

import $ from 'jquery';
import handlebars from 'handlebars';
import * as notifier from 'notifier';

import { loadTemplate } from 'template';
import { dataValidator } from 'dataValidator';

const $containerElement = $('#container');

function homePanel() {
    loadTemplate('news-feed.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
        });
}

function profilePanel() {
    loadTemplate('profile.html')
        .then((htmlTemplate) => {
            $containerElement.html(htmlTemplate);
        });
}

export { homePanel, profilePanel };