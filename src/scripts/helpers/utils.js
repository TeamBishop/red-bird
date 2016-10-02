/* globals btoa, FileReader, this*/

'use strict';

import * as notifier from 'notifier';

function getBase64Code(value) {
    let encodedValue = btoa(value);
    return encodedValue;
}

function uploadImage() {
    if (this.files && this.files[0]) {
        var imageReader = new FileReader();
        imageReader.onload = function(e) {
            if (e.total <= 50000) {
                notifier.notifySuccess('Picture uploaded');
                return '' + e.target.result;
            } else {
                notifier.notifyError("Picture must be lower than 50kb!");
            }
        };
        imageReader.readAsDataURL(this.files[0]);
    }
}

export { getBase64Code, uploadImage };