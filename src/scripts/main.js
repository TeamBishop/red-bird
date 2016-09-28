import * as users from 'userService';

// Test
let SignUp = document.createElement('a');
SignUp.innerHTML = 'SignUp';

document.getElementById('container').appendChild(SignUp);

SignUp.addEventListener('click', function() {
    users.signUp('StoyanAdasha', 123, 'st@abv.bg')
        .then((resp) => {
            console.log('YES');
            console.log(resp);
        }, (err) => {
            console.log('NO');
            console.log(err);
        });
});