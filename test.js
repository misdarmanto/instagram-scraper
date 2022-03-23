const instagram = require("@phaticusthiccy/open-apis");

// ========== POST & IGTV DOWNLOADER ========== 
async function start() {
    var data = await instagram.insta_post("https://www.instagram.com/p/CbXE8wKh4qQ/?utm_source=ig_web_copy_link")
    console.log(data)
}

start()


// const insta_hashtag = (req, res) => {
//     let URL = `https://www.instagram.com/explore/tags/${req.params.keyword}/`;
//     rp(URL)
//       .then((html) => {
//         let hashtags = scrapeHashtags(html);
//         hashtags = removeDuplicates(hashtags);
//         hashtags = hashtags.map((ele) => "#" + ele);
//         res.json(hashtags);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
  
//     const scrapeHashtags = (html) => {
//       var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
//       var matches = [];
//       var match;
  
//       while ((match = regex.exec(html))) {
//         matches.push(match[1]);
//       }
  
//       return matches;
//     };
  
//     const removeDuplicates = (arr) => {
//       let newArr = [];
  
//       arr.map((ele) => {
//         if (newArr.indexOf(ele) == -1) {
//           newArr.push(ele);
//         }
//       });
  
//       return newArr;
//     };
//   };