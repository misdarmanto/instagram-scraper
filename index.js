var express = require("express");
let app = express();
let Crawler = require("crawler");
let bodyParser = require("body-parser");
const rp = require("request-promise");
let cheerio = require("cheerio");
let request = require("request");

// let insta_video = require("./routes/insta_video");
// let insta_image = require("./routes/insta_image");
// let insta_hashtag = require("./routes/insta_hashtag");
const port = process.env.PORT || 3000;

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
  res.send("ok, Run!");
});

const insta_hashtag = (req, res) => {
  let URL = `https://www.instagram.com/explore/tags/${req.params.keyword}/`;
  rp(URL)
    .then((html) => {
      let hashtags = scrapeHashtags(html);
      hashtags = removeDuplicates(hashtags);
      hashtags = hashtags.map((ele) => "#" + ele);
      res.json(hashtags);
    })
    .catch((err) => {
      console.log(err);
    });

  const scrapeHashtags = (html) => {
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(html))) {
      matches.push(match[1]);
    }

    return matches;
  };

  const removeDuplicates = (arr) => {
    let newArr = [];

    arr.map((ele) => {
      if (newArr.indexOf(ele) == -1) {
        newArr.push(ele);
      }
    });

    return newArr;
  };
};

app.post("/instagram/video", (req, res) => {
  let video_url = req.body.url;
  // console.log(JSON.stringify(req.body.url));
  if (video_url !== undefined) {
    if (
      video_url.substring(0, 8) === "https://" ||
      video_url.substring(0, 7) === "http://" ||
      video_url.substring(0, 21) === "https://www.instagram" ||
      video_url.substring(0, 20) === "http://www.instagram.com"
    ) {
      request(video_url, (error, response, html) => {
        if (!error) {
          // console.log("Insta_grab : " + video_url + " : Loaded");
          let $ = cheerio.load(html);

          //basic data from the meta tags
          let video_link = $('meta[property="og:video"]').attr("content");
          let file = $('meta[property="og:type"]').attr("content");
          let url = $('meta[property="og:url"]').attr("content");
          let title = $('meta[property="og:title"]').attr("content");
          res.status(200).json({ title, url, file, video_link });
        } else {
          res.status(400).json({ message: "Error, Unable to load webpage" });
        }
      });
    } else {
      res.status(201).json({ message: "Invalid URL" });
    }
  } else {
    res.status(400).json({ message: "Provided invalid URL" });
  }
});



app.post("/instagram/image", (req, res) => {
  const image_url = req.body.url;
  //   console.log(JSON.stringify(req.query));
  if (image_url !== undefined) {
    if (
      image_url.substring(0, 8) === "https://" ||
      image_url.substring(0, 7) === "http://"
    ) {
      request(image_url, (error, response, html) => {
        if (!error) {
          //   console.log("Insta_grab : " + image_url + " : Loaded");
          const $ = cheerio.load(html);

          //basic data from the meta tags
          const image_link = $('meta[property="og:image"]').attr("content");
          const file = $('meta[property="og:type"]').attr("content");
          const url = $('meta[property="og:url"]').attr("content");
          const title = $('meta[property="og:title"]').attr("content");
          res.status(200).json({ title, url, file, image_link });
        } else {
          res.status(400).json({ message: "Error, Unable to load webpage" });
        }
      });
    } else {
      res.status(201).json({ message: "Invalid URL" });
    }
  } else {
    res.status(400).json({ message: "Provided invalid URL" });
  }
});

app.get("/instagram/hashtag/:keyword", insta_hashtag);

app.listen(port, () => {
  console.log("Server running at " + port);
});
