const controller = require("../controllers/todo.controller");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/todos", controller.createTodo)

    app.get("/api/todos", controller.retrieveTodo)

    app.delete("/api/todos/:id", controller.deleteTodoById)

    app.delete("/api/todos", controller.deleteTodo)
};
