const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.todo = require("./todo.model");
db.calendar = require("./calendar.model");
db.article = require("./article.model")

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
