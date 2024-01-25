const mongoose = require("mongoose");

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        text: String,
        completed: Boolean,
    })
)

module.exports = Todo;
