const mongoose = require('mongoose')
const shortId = require('shortid')

const urlMapping = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('urlMap', urlMapping)
