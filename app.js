const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
app.set('view engine', 'pug');

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
app.use(express.static(publicPath));
const upload = multer({ dest: uploadPath });

const uploadedFiles = [];

app.get('/', (request, response) => {
    // returns array with dir contents ; has all of file names ina  particular directory; we need this to add an image tag for eeach folder
    fs.readdir(uploadPath, function(err, imgNames) {
        imgNames.splice(imgNames.findIndex(imgName => imgName === '.DS_Store'), 1);
        console.log(imgNames);
        response.render("index", {imgNames});
    });
});

app.post('/uploads', upload.single('myFile'), (request, response) => {
    let newImage = `uploads/${request.file.filename}`
    console.log(`Uploaded file = ${newImage}`);
    uploadedFiles.push(newImage);
    response.render("upload", {newImage});
});

app.listen(port);