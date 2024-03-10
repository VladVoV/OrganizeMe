const controller = require("../controllers/replies.controller");
const {authJwt} = require("../middlewares");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/replies/", authJwt.verifyToken)

    app.get("/api/replies/:id", controller.retrieveReply)

    app.post("/api/replies/create/:id", controller.createReply)

    app.put("/api/replies/like/:id", controller.updateReply)
};
