const mongoose = require("mongoose");

const Article = mongoose.model(
    "Article",
    new mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        image: {
            data: Buffer,
            contentType: String
        }
    })
);

module.exports = Article;
