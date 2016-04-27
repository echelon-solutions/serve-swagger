Inspired by: https://github.com/moander/serve-swagger-editor. Added swagger-ui for hosting too.

## Sample Server Code
```js
var app = require('serve-swagger')({
	disableNewUserIntro: true,
	useBackendForStorage: true,
	useYamlBackend: true
}, './tmp/myspec.yaml');

var server = require('http').createServer(app);

server.listen(8080, function () {
	console.log(server.address());
});
```

With above code, you should be able to access 
- Swagger Editor: http://localhost:8080/swagger/editor
- Swagger UI: http://localhost:8080/swagger/ui?url=http://localhost:8080/editor/spec (url query specifies your own spec file location)
