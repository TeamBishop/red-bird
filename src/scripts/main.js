import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';
import * as homeController from 'homeController';
import * as navController from 'navController';


let app = new Sammy('#container', function() {
    this.get('#/authorise', function(context) {
        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $('#wrapper').css({
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

        $('#wrapper').css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/profile', function() {
        let wrapperBackgroundUrl = '../images/home-background.jpg';
        homeController.profilePanel();

        $('#wrapper').css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/logout', userController.logOutUser);
});

$(function() {
    app.run('#/');
}());