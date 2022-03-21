var express = require("express");
let app = express();
let Crawler = require("crawler");
let bodyParser = require("body-parser");
let insta_video = require("./routes/insta_video");
let insta_image = require("./routes/insta_image");
let insta_hashtag = require("./routes/insta_hashtag");
const port = process.env.PORT || 8080


app.use(bodyParser.json()); // support json encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
); // support encoded bodies

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Running!");
});

app.post("/instagram/video", insta_video);
app.post("/instagram/image", insta_image);
app.get("/instagram/hashtag/:keyword", insta_hashtag);

app.listen(port, () => {
  console.log("Server running at " + port);
});
