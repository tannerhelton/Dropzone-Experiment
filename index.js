var express = require("express"),
  multer = require("multer"),
  app = express(),
  port = 5000;
app.set("port", port);

var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, __dirname + "/public/uploads/");
  },
  filename: function(request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  }
});

app.use(express.static(__dirname + "/bower_components/dropzone/dist/"));
var upload = multer({ storage: storage }).array("photo", 5);

app.get("/", function(resuest, response) {
  response.sendFile(__dirname + "/public/index.html");
});

app.post("/upload", function(request, response) {
  upload(request, response, function(err) {
    if (err) {
      console.log("Error Occured" + err);
      return;
    }
    console.log(request.files);
    response.end("Your Files Uploaded");
    console.log("Photo Uploaded");
  });
});

var server = app.listen(port, function() {
  console.log("Listening on port " + server.address().port);
});
