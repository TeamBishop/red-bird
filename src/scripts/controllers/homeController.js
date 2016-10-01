'use strict';

import $ from 'jquery';
import { loadTemplate } from 'template';

const $containerElement = $('#container');
const $containerLeftElement = $('#container-left');

function homePanel() {
    loadTemplate('news-feed.html')
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

function editProfilePanel() {
    loadTemplate('profile.html')
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

export { homePanel, profilePanel, leftSidePanel, editProfilePanel };