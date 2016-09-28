'use strict';

function getBase64Code(value) {
    let encodedValue = btoa(value);
    return encodedValue;
}

export { getBase64Code };