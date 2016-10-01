/* globals localStorage */

'use strict';

const storage = {
    getItem(key) {
        return localStorage.getItem(key);
    },

    setItem(key, value) {
        localStorage.setItem(key, value);
    },

    removeItem(key) {
        localStorage.removeItem(key);
    }
};

export { storage };