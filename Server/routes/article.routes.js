const controller = require("../controllers/article.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/articles", authJwt.verifyToken)

    app.post("/api/articles", controller.createArticle);
    app.get("/api/articles", controller.getArticles);
    app.put("/api/articles/:id", controller.updateArticle);
    app.delete("/api/articles/:id", controller.deleteArticle);
};
