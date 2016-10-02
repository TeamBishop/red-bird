import Sammy from 'Sammy';
import $ from 'jquery';

import { hasLoggedInUser } from 'userService';
import * as myPostController from 'myPostController';
import * as userController from 'userController';
import * as homeController from 'homeController';
import * as navController from 'navController';
import * as profileController from 'profileController';
import * as searchController from 'searchController';
import { storage } from 'storage';

let $body = $('body');
let homeBackground = '../images/grey-background-05.jpg';
let loginBackground = '../images/grey-linen-texture-background.jpg';

let app = new Sammy('#container', function() {
    this.before({ except: { path: '#/login' } }, function() {
        const $navPanel = $('nav-panel');
        const $profileSidePanel = $('#container-left');
        const that = this;

        if (hasLoggedInUser()) {
            if ($navPanel.html() === undefined) {
                navController.logedPanel();
            }
            if ($profileSidePanel.html() === undefined || $profileSidePanel.html() === '') {
                //homeController.leftSidePanel();
                profileController.loadSidePanel();
            }

            $profileSidePanel.on('click', '#profile-panel', function() {
                that.redirect('#/profile');
            });

            $body.css({
                'background-image': 'url(' + homeBackground + ')',
            });
        } else {
            $profileSidePanel.html('');

            $body.css({
                'background-image': 'url(' + loginBackground + ')',
            });
        }
    });

    this.get('#/signup', function(context) {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            navController.welcomePanel();
            userController.signUpUser(context);

            $body.css({
                'background-image': 'url(' + loginBackground + ')',
            });
        }
    });

    this.get('#/login', function(context) {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            navController.welcomePanel();
            userController.logInUser(context);

            $body.css({
                'background-image': 'url(' + loginBackground + ')',
            });
        }
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
        storage.setItem('post-possition', 0);
        homeController.generateHome();
        navController.logedPanel();
        homeController.getPost();
        //homeController.updatePostFeed();
        // searchController.searchUsers();
    });

    this.get('#/myposts', function() {
        myPostController.loadCurrentUserPosts();
    });

    this.get('#/profile', profileController.loadProfile);


    this.get('#/profile', function() {
        profileController.loadProfile();
    });

    this.get('#/search', searchController.searchUsers);

    this.get('#/profile/edit', profileController.updateProfile);

});

$(function() {
    app.run('#/');
}());