js-beautify *.js -r
jscs *.js
mocha --harmony
jsdoc -d ../homepage/apidocs . -t ../jsdocs/karma-jsdoc-template/