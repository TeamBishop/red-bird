// import Sammy from 'Sammy';

// import { hasLoggedInUser } from 'userService';
// import * as userController from 'userController';

import * as user from 'userService';


// let app = new Sammy('#container', function() {
//     this.get('#/authorise', function() {
//         console.log('HER');
//         userController.authorise();
//     });

//     this.get('#/', function() {
//         if (hasLoggedInUser()) {
//             this.redirect('#/home');
//         } else {
//             this.redirect('#/authorise');
//         }
//     });

//     this.get('#/home', function() {
//         console.log('Logged IN');
//     });
// });

// app.run('#/');

var reg = document.createElement('a');
reg.innerHTML = 'Sign';
document.getElementById('container').appendChild(reg);

reg.addEventListener('click', function() {
    user.signUp('Pesho', 123, 'pesho@abv.bg')
        .then((resp) => {
            console.log('Register OK');
            console.log(resp);
        }, (error) => {
            console.log('Not Registered');
            console.log(error);
        });
});

var logIn = document.createElement('a');
logIn.innerHTML = 'logIn';
document.getElementById('container').appendChild(logIn);

logIn.addEventListener('click', function() {
    user.logIn('Pesho', 123)
        .then((resp) => {
            console.log('logIn');
            console.log(resp);
        }, (error) => {
            console.log('logIn NOT');
            console.log(error);
        });
});

var logOut = document.createElement('a');
logOut.innerHTML = 'logOut';
document.getElementById('container').appendChild(logOut);

logOut.addEventListener('click', function() {
    user.logOut()
        .then((resp) => {
            console.log('logOut');
            console.log(resp);
        }, (error) => {
            console.log('logOut NOT');
            console.log(error);
        });
});