const controller = require("../controllers/posts.controller");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/posts/", controller.retrievePosts)

    app.get("/api/posts/:id", controller.retrievePostById)

    app.post("/api/posts/create", controller.createPost)

    app.put("/api/posts/like/:id", controller.updateLike)
};
