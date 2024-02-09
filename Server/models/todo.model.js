const mongoose = require("mongoose");

const Todo = mongoose.model(
    "Todo",
    new mongoose.Schema({
        text: String,
        completed: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
)

module.exports = Todo;
