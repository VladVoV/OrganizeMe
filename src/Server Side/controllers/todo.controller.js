const db = require("../models");
const Todo = db.todo


exports.createTodo = async (req, res) => {
    try {
        const { text } = req.body;
        const todo = new Todo({ text, completed: false });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Could not create to-do item.' });
    }
}

exports.retrieveTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve to-do items.' });
    }
}

exports.deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndRemove(id);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(deletedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete to-do item.' });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const deleteTodos = await Todo.deleteMany();
        res.status(200).json(deleteTodos);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete to-do items.' });
    }
}



