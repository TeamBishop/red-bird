import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';
import * as homeController from 'homeController';
import * as navController from 'navController';

let $body = $('body');

let app = new Sammy('#container', function() {
    this.before({ except: { path: '#/authorise' } }, function() {
        const $navPanel = $('nav-panel');
        const $profileSidePanel = $('#container-left');
        const that = this;

        if (hasLoggedInUser()) {
            if ($navPanel.html() === undefined) {
                navController.logedPanel();
            }
            if ($profileSidePanel.html() === undefined || $profileSidePanel.html() === '') {
                homeController.leftSidePanel();
            }

            $profileSidePanel.on('click', '#profile-panel', function() {
                that.redirect('#/profile');
            });

            let wrapperBackgroundUrl = '../images/home-background.jpg';
            $body.css({
                'background-image': 'url(' + wrapperBackgroundUrl + ')',
            });
        } else {
            $profileSidePanel.html('');

            let wrapperBackgroundUrl = '../images/login-background.jpg';
            $body.css({
                'background-image': 'url(' + wrapperBackgroundUrl + ')',
            });
        }
    });

    this.get('#/authorise', function(context) {
        navController.welcomePanel();
        userController.authoriseUser(context);

        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/', function() {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            this.redirect('#/authorise');
        }
    });

    this.get('#/home', function() {
        homeController.generateHome();
        navController.logedPanel();
        //homeController.getAllPost();

    });

    this.get('#/profile', function() {
        homeController.profilePanel();
    });

    this.get('#/profile/edit', function() {
        homeController.editProfilePanel();
    });

    this.get('#/logout', userController.logOutUser);
});

$(function() {
    app.run('#/');
}());