var express = require("express");
let app = express();
let bodyParser = require("body-parser");
const instagram = require("@phaticusthiccy/open-apis");
const tiktokscraper = require("tiktok-scraper-ts");
const { TTScraper } = require("tiktok-scraper-ts");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>hello bicth</h1>");
});

app.post("/instagram/download", (req, res) => {
  async function start() {
    var data = await instagram.insta_post(req.body.url);
    res.status(200).json(data);
  }
  start();
});

app.post("/instagram/story", (req, res) => {
  async function start() {
    var data = await instagram.insta_story(req.body.userName);
    res.status(200).json(data);
  }
  start();
});

app.post("/instagram/tiktok", (req, res) => {
  const TikTokScraper = new TTScraper();
  (async () => {
    const fetchVideo = await TikTokScraper.video(req.body.url);
    res.status(200).json(fetchVideo);
  })();
});

app.listen(port, () => {
  console.log("Server running at " + port);
});
