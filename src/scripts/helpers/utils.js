/* globals btoa */

'use strict';

function getBase64Code(value) {
    let encodedValue = btoa(value);
    return encodedValue;
}

// function uploadImage(context) {
//     return new Promise((resolve, reject) => {
//         if (context.files && context.files[0]) {
//             var imageReader = new FileReader();
//             imageReader.onload = function(e) {
//                 if (e.total <= 5000) {
//                     // image = '' + e.target.result;
//                     resolve(e.target.result);
//                 } else {
//                     resolve('');
//                     // notifier.notifyError("Picture must be lower than 50kb!");
//                 }
//             };
//             imageReader.readAsDataURL(context.files[0]);
//         }
//     });
// }

export { getBase64Code };