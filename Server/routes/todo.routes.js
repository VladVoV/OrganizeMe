const controller = require("../controllers/todo.controller");
const authJwt = require("../middlewares/authJwt");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/todos", authJwt.verifyToken)

    app.get("/api/todos", controller.retrieveTodo)

    app.get("/api/todos/:id", controller.retrieveTodoById)

    app.post("/api/todos", controller.createTodo)

    app.put("/api/todos/update/:id", controller.updateTodo)

    app.delete("/api/todos/:id", controller.deleteTodoById)

    app.delete("/api/todos", controller.deleteTodo)
};
