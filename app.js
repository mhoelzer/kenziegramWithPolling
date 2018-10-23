const express = require("express");
const multer = require("multer");
// fs is built into node, so dont need to npm install it, but need it up here
const fs = require("fs");

const app = express();
app.set("view engine", "pug");

const publicPath = "public/";
const uploadPath = "public/uploads/"
const port = 3000;
app.use(express.static(publicPath));
app.use(express.json());
const upload = multer({ dest: uploadPath });

const uploadedFiles = [];

app.get("/", (request, response) => {
    // returns array with dir contents ; has all of file names ina  particular directory; we need this to add an image tag for eeach folder
    fs.readdir(uploadPath, function (err, imgNames) {
        imgNames.splice(imgNames.findIndex(imgName => imgName === ".DS_Store"), 1);
        console.log(imgNames);
        response.render("index", { imgNames });
    });
});
// multer is with the upload.single 
app.post("/uploads", upload.single("myFile"), (request, response) => {
    let newImage = `uploads/${request.file.filename}`
    console.log(`Uploaded file = ${newImage}`);
    uploadedFiles.push(newImage);
    response.render("upload", { newImage });
});

app.post("/latest", (request, response) => {
    // always read dir of imgs and get img names, then do the checking about what images need in array to sedn back of see timestamp each time 
    fs.readdir(uploadPath, function (err, imgNames) {
        let clientTimeStamp = request.body.after;
        let imageInfo = {
            timestamp: Date.now(),
            image: uploadedFiles
        };
        let imagesArray = [];
        let highestTimeStamp = 0;
        for (let i = 0; i < imgNames.length; i++) {
            let modified = fs.statSync(imgNames[i]).mtimeMs;
            if (modified > clientTimeStamp) {
                //add to array to send to client
                imagesArray.push(imgNames[i])
            }
            if (modified > highestTimeStamp) {
                highestTimeStamp = modified
            }
        };
        response.send({
            images: imagesArray,
            timestamp: highestTimeStamp
        })
    })
})

app.listen(port);