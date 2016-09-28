import * as users from 'userService';

// Tests
let SignUp = document.createElement('a');
SignUp.innerHTML = 'SignUp';
document.getElementById('container').appendChild(SignUp);
SignUp.addEventListener('click', function() {
    users.signUp('Stoyan', 123, 'st@abv.bg');
});

let LogIn = document.createElement('a');
LogIn.innerHTML = 'LogIn';
document.getElementById('container').appendChild(LogIn);
LogIn.addEventListener('click', function() {
    users.logIn('Stoyan', 123);
});

let LogOut = document.createElement('a');
LogOut.innerHTML = 'LogOut';
document.getElementById('container').appendChild(LogOut);
LogOut.addEventListener('click', function() {
    users.logOut();
});