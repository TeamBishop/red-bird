SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'jquery': '../bower-components/jquery/dist/jquery.js',
        'handlebars': '../bower-components/handlebars/handlebars.js',
        'main': './scripts/main.js'
    }
});