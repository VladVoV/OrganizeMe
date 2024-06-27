const controller = require("../controllers/calendar.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/calendar", authJwt.verifyToken)

    app.get("/api/calendar", controller.retrieveCalendar)

    app.post("/api/calendar", controller.createCalendarEvent)

    app.delete("/api/calendar/:id", controller.deleteCalendarEvent);
};
