const rp = require("request-promise");

module.exports = (req, res) => {
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
