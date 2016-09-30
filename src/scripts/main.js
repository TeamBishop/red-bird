import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as userController from 'userController';


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
        console.log('Logged IN');
    });

    this.get('#/logout', userController.logOutUser);
});

$(function() {
    app.run('#/');
}());