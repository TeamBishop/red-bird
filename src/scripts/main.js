import Sammy from 'Sammy';
import { hasLoggedInUser } from 'userService';

let app = new Sammy('#container', function() {
    this.get('#/', function() {
        if (hasLoggedInUser()) {
            this.redirect('#/home');
        } else {
            this.redirect('#/authorise');
        }
    });

    this.get('#/home', function() {
        // home templete load
    });
});

app.run('#/');