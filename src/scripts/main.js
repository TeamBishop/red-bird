import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';
import * as homeController from 'homeController';
import * as navController from 'navController';
import * as feedController from 'feedController';

let $body = $('body');

let app = new Sammy('#container', function() {
    this.before({ except: { path: '#/authorise' } }, function() {
        const $navPanel = $('nav-panel');

        if (hasLoggedInUser() && $navPanel.html() === undefined) {
            navController.logedPanel();

            let wrapperBackgroundUrl = '../images/home-background.jpg';
            $body.css({
                'background-image': 'url(' + wrapperBackgroundUrl + ')',
            });
        }
    });

    this.get('#/authorise', function(context) {
        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
        navController.welcomePanel();
        userController.authoriseUser(context);

    });

    this.get('#/', function() {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            this.redirect('#/authorise');
        }
    });

    this.get('#/home', function() {
        let wrapperBackgroundUrl = '../images/home-background.jpg';
        homeController.homePanel();
        navController.logedPanel();
        feedController.createPost();
        feedController.getFeed();

        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/profile', function() {
        let wrapperBackgroundUrl = '../images/home-background.jpg';
        homeController.profilePanel();

        $body.css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/logout', userController.logOutUser);
});

$(function() {
    app.run('#/');
}());