'use strict';

import * as httpRequester from 'httpRequester';

const pathStart = '../../html-templates/';

function loadTemplate(name) {
    let path = pathStart + name;

    return httpRequester.get(path);
}

export { loadTemplate };