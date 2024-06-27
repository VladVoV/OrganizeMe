const db = require("../models");
const Article = db.article;
const multer = require('multer');
const upload = multer();

exports.createArticle = [
    upload.single('image'),
    async (req, res) => {
        const { title, content } = req.body;
        try {
            const article = new Article({
                title,
                content,
                image: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            await article.save();
            res.status(201).send(article);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
];

exports.getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        const articlesWithBase64Images = articles.map(article => {
            if (article.image && article.image.data) {
                return {
                    ...article.toObject(),
                    image: {
                        contentType: article.image.contentType,
                        data: article.image.data.toString('base64')
                    }
                };
            }
            return article;
        });
        res.status(200).send(articlesWithBase64Images);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.updateArticle = [
    upload.single('image'),
    async (req, res) => {
        const articleId = req.params.id;
        const { title, content } = req.body;
        try {
            const updateData = { title, content };
            if (req.file) {
                updateData.image = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                };
            }
            const updatedArticle = await Article.findByIdAndUpdate(
                articleId,
                updateData,
                { new: true }
            );
            res.status(200).send(updatedArticle);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
];

exports.deleteArticle = async (req, res) => {
    const articleId = req.params.id;
    try {
        await Article.findByIdAndDelete(articleId);
        res.status(200).send({ message: "Article deleted successfully" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
