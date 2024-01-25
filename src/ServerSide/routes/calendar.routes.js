const controller = require("../controllers/calendar.controller");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/calendar", controller.retrieveCalendar)

    app.post("/api/calendar", controller.createCalendarEvent)

};
