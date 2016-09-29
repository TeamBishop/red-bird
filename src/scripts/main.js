import Sammy from 'Sammy';
import { hasLoggedInUser } from 'userService';

let app = new Sammy('#container', function() {
    this.get('#/', function() {
        if (!hasLoggedInUser()) {

        } else {

        }
    });

    this.get('#/home', function() {
        this.redirect('/#/');
    });
});

app.run('#/');