'use strict';

const dataValidator = {
    stringValidation: {
        isLengthInRange(value, min, max) {
            if (max === undefined) {
                min = 0;
                max = min;
            }

            return min <= value.length && value.length <= max;
        },
        isEmpty(value) {
            return value === '';
        }
    }
};

export { dataValidator };