import Sammy from 'Sammy';
import { hasLoggedInUser } from 'userService';

let app = new Sammy('#container', function() {
    this.get('#/', function() {
        if (!hasLoggedInUser()) {
            this.redirect('#/login');
        }

        console.log('Main page');
    });

    this.get('#/home', function() {
        this.redirect('/#/');
    });

    this.get('/#/signup', function() {
        console.log('Sign UP');
    });

    this.get('/#/login', function() {
        console.log('Logging');
    });
});

app.run('#/');