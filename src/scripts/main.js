import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';
import * as homeController from 'homeController';


let app = new Sammy('#container', function() {
    this.get('#/authorise', function(context) {
        let wrapperBackgroundUrl = '../images/login-background.jpg';
        $('#wrapper').css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });

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

        $('#wrapper').css({
            'background-image': 'url(' + wrapperBackgroundUrl + ')',
        });
    });

    this.get('#/logout', userController.logOutUser);
});

$(function() {
    app.run('#/');
}());