SystemJS.config({

    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',

    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': '../bower_components/jquery/dist/jquery.js',
        'handlebars': '../bower_components/handlebars/handlebars.js',
        'main': './scripts/main.js',
        'httpRequester': './scripts/helpers/http-requester.js',
        'appConstants': './scripts/helpers/app-constants.js',
        'userService': './scripts/services/userService.js',
        'utils': './scripts/helpers/utils.js',
        'Sammy': '../bower_components/sammy/lib/sammy.js',
        'userController': './controllers/userController.js',
        'template': './helpers/template.js.js',
    }
});