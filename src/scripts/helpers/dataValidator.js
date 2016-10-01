'use strict';

const dataValidator = {
    isValidName(value, min, max, allowedCharacters) {
        if (allowedCharacters === undefined) {
            let defaultCharacters = 'qwertyuioplkjhgfdsazxcvbnm' + 'qwertyuioplkjhgfdsazxcvbnm'.toUpperCase();
            allowedCharacters = defaultCharacters;
        }

        for (let i = 0; i < value.length; i += 1) {
            if (allowedCharacters.indexOf(value[i]) < 0) {
                return false;
            }
        }

        return min <= value.length && value.length <= max;
    },
    isValidEmail(value) {

        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(value);
    }
};

export { dataValidator };