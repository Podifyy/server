const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const podcastSchema = mongoose.Schema({
    name: {type: String, required: true, trim: true},
    images: {type: String, required: true},
    url: {type: String, required: true},
    ratings: [ratingSchema],
    

});

const Podcast = mongoose.model("Podcast", podcastSchema);
module.exports = {Podcast, podcastSchema};