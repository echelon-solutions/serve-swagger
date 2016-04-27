Inspired by: https://github.com/moander/serve-swagger-editor. Added swagger-ui for hosting too.

## Main Feature
- To allow the Swagger Editor to save the API spec file to the backend (using PUT) instead of using client-side localstorage. 
- The Swagger UI can read the same spec file and render the UI in real time.

## Sample Server Code
```js
var http = require('http');
var serveSwagger = require('./serve-swagger'); 

var app = serveSwagger({
  disableNewUserIntro: true,
  useBackendForStorage: true,
  useYamlBackend: true
}, './tmp/myspec.yaml');

var server = http.createServer(app);

server.on('request', function (req, res) {

  res.on('finish', function () {
    console.log(res.statusCode, req.method, req.originalUrl);     
  });
});

server.listen(8080, function () {
  console.log(server.address());
});
```

With above code, you should be able to access 
- Swagger Editor: http://localhost:8080/swagger/editor
- Swagger UI: http://localhost:8080/swagger/ui?url=http://localhost:8080/editor/spec (url query specifies your own spec file location)
