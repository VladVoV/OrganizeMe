const db = require("../models");
const Article = db.article;

// Create a new article
exports.createArticle = async (req, res) => {
    const { title, content, imageUrl } = req.body;

    try {
        const article = await Article.create({ title, content, imageUrl });
        res.status(201).send(article);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Fetch all articles
exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).send(articles);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Update an article
exports.updateArticle = async (req, res) => {
    const articleId = req.params.id;
    const { title, content, imageUrl } = req.body;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            { title, content, imageUrl },
            { new: true }
        );
        res.status(200).send(updatedArticle);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
    const articleId = req.params.id;

    try {
        await Article.findByIdAndDelete(articleId);
        res.status(200).send({ message: "Article deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
