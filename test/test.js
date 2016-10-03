var expect = require("chai").expect;
var sinon = require("sinon");

require('../src/scripts/main.js');

describe('Tests', function() {
    describe('helpers tests', function() {
        describe('template tests', function() {
            beforeEach(function() {
                sinon.stub(httpRrequester, 'get')
                    .returns(new Promise((resolve, reject) => {
                        resolve(result);
                    }));
            });
            it('loadTemplate should be called once', function(done) {
                let templateName = 'profile.html';
                template.loadTemplate(templateName).then((htmlTemplate) => {
                    const actual = httpRequester.get
                        .firstCall
                        .args[0];
                }).then(done, done);
            });
        });
    });
});