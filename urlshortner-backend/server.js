const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const urlMap = require("./models/shortUrl");
const generateShortUrl = require("./generateShortUrl");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_CONN_URL)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("database connection failed. Server not started");
    console.error(err);
  });

// handle get url request
app.post("/getUrl", async (req, res) => {

  console.log("getUrl request",req.body);

  const { stringUrl } = req.body;

  const longUrl = await urlMap.findOne( { shortUrl: stringUrl } );


  // console.log(longUrl);
  if (longUrl) {
    console.log(longUrl.longUrl);
    // return res.status(302).redirect(longUrl);
    return res.send(longUrl.longUrl);
  } else {
    console.log("NOT FOUND");
    // return res.status(302).redirect('https://www.google.com/');
    return res.send('NOT FOUND');
  }
});

// handle post url request
app.post("/setUrl", async (req, res) => {
  console.log("setUrl request",req.body);

  const { stringUrl } = req.body;

  var shortUrl = await urlMap.findOne({ longUrl: stringUrl });
  if (shortUrl) {
    console.log(shortUrl);
    return res.send(shortUrl.shortUrl);
  } else {
    const totalSites = await urlMap.count({});
    // console.log('adding a new site in database','total sites present: ',totalSites);
    shortUrl = generateShortUrl.generateShortUrl(totalSites);
    await urlMap.create({
      longUrl: stringUrl,
      shortUrl: shortUrl
    });
    console.log(shortUrl);
    return res.send(shortUrl);
  }
});
