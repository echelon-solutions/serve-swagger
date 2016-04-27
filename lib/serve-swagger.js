'use strict';

var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var express = require('express');
var serveJson = require('./serve-json');
var serveSpecfile = require('./serve-specfile');

var swaggerEditorRoot = path.join(__dirname, '../node_modules/swagger-editor');
var swaggerUIRoot = path.join(__dirname, '../node_modules/swagger-ui/dist');

var defaultOptions = {
	editorRoot: swaggerEditorRoot,
	editorDefaults: JSON.parse(fs.readFileSync(path.join(swaggerEditorRoot, 'config/defaults.json'), 'utf8')),
	specfilePath: '/tmp/swagger-editor-spec.yaml',
	specfileCreateIfMissing: true,
	specfileCreateIfMissingTemplatePath: path.join(swaggerEditorRoot, 'spec-files/minimal.yaml'),
};

module.exports = function (cfg, options) {				
	if (typeof options === 'string') {
		options = {specfilePath: options};
	}

	options = _.defaults(Object(options||null), defaultOptions);
	cfg = _.defaults(Object(cfg||null), options.editorDefaults);
	options.editorDefaults = cfg;

	var app = express();
	
	
	app.use('/swagger/editor/config/defaults.json', serveJson(cfg));
	
	app.use(cfg.backendEndpoint, serveSpecfile(cfg, options));

	app.use('/swagger/editor', express.static(options.editorRoot));

	app.use('/swagger/ui', express.static(swaggerUIRoot));

	app.get('/', function(req, res){
		var specUrl = req.protocol + '://' + req.get('host') +'/editor/spec';
		res.redirect('/swagger/ui?url=' + specUrl);
		res.end();
	});

	

	return app;	
};

