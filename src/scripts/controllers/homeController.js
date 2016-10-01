'use strict';

import $ from 'jquery';
import { loadTemplate } from 'template';

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