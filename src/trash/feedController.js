// 'use strict';

// import $ from 'jquery';
// import handlebars from 'handlebars';
// import * as notifier from 'notifier';

// import * as feedService from 'feedService';
// import { loadTemplate } from 'template';
// import { dataValidator } from 'dataValidator';

// const $containerElement = $('#container'),
//     USER_ID = 'x-user-id';


// function createPost() {
//     loadTemplate('news-feed.html')
//     .then((htmlTemplate) => {
//         $containerElement.html(htmlTemplate);

//         $('#post-btn').on('click', function() {
//             let username = localStorage.getItem(USER_ID),
//                 message = $('#post-context').val(),
//                 image = $('#post-image').val(),
//                 context = {
//                     message: message,
//                     image: image
//                 };

//             $('#post-context').val('');
            
//             // Must add some kind of validation !

//             feedService.createPost(username, context)
//                         .then((responseData) => {
//                             console.log(responseData);
                            
//                         }, (error) => {
//                             console.log(error);
//                         });
//         });
//     });

//     // function getPost() {

//     // }




// }

// export { createPost };