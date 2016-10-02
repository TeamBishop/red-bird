import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';
import * as homeController from 'homeController';
import * as navController from 'navController';
import * as profileController from 'profileController';

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

    this.get('#/signup', function(context) {
        navController.welcomePanel();
        userController.signUpUser(context);

        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/login', function(context) {
        navController.welcomePanel();
        userController.logInUser(context);

        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/logout', userController.logOutUser);

    this.get('#/', function() {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            this.redirect('#/login');
        }
    });

    this.get('#/home', function() {
        homeController.generateHome();
        navController.logedPanel();
        homeController.getAllPost();

    });

    this.get('#/profile', function() {
        // homeController.profilePanel();
        profileController.loadProfile();
    });

    this.get('#/profile/edit', function() {
        homeController.editProfilePanel();
    });

});

$(function() {
    app.run('#/');
}());