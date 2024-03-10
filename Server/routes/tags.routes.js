const controller = require("../controllers/tags.controller");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/tags/", controller.retrieveTag)

    app.post("/api/tags/create", controller.createTag)
};
