const controller = require("../controllers/posts.controller");
const {authJwt} = require("../middlewares");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/posts/", authJwt.verifyToken)

    app.get("/api/posts/", controller.retrievePosts)

    app.get("/api/posts/:id", controller.retrievePostById)

    app.post("/api/posts/create", controller.createPost)

    app.put("/api/posts/like/:id", controller.updateLike)
};
