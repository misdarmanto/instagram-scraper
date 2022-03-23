const instagram = require("@phaticusthiccy/open-apis");

// ========== POST & IGTV DOWNLOADER ========== 
async function start() {
    var data = await instagram.insta_post("https://www.instagram.com/p/CbXE8wKh4qQ/?utm_source=ig_web_copy_link")
    console.log(data)
}

start()