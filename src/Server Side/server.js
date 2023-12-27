const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require("cookie-session");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cookieSession({
        name: "organize-me_session",
        keys: ["FGd@FJASfh#cx@"],
        httpOnly: true
    })
);


const db = require("./models");
const Role = db.role;

db.mongoose
    .connect('mongodb+srv://vladvojch:DijavVDLMRvhogtm@cluster0.z6gxgmw.mongodb.net/to-do_list', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const calendarEventSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String,
});

const Todo = mongoose.model('Todo', todoSchema);
const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);

app.post('/api/todos', async (req, res) => {
    try {
        const { text } = req.body;
        const todo = new Todo({ text, completed: false });
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Could not create to-do item.' });
    }
});

app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve to-do items.' });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
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
});

app.delete('/api/todos', async (req, res) => {
    try {
        const deleteTodos = await Todo.deleteMany();
        res.status(200).json(deleteTodos);
    } catch (error) {
        res.status(500).json({ error: 'Could not delete to-do items.' });
    }
})

app.get('/api/calendar', async (req, res) => {
    try {
       const calendarEvents = await CalendarEvent.find();
       res.status(200).json(calendarEvents);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve calendar items.' });
    }
})
app.post('/api/calendar', async (req, res) => {
    try {
        const { title, date, description } = req.body;
        const calendarEvent = new CalendarEvent({ title, date, description });
        await calendarEvent.save();
        res.status(201).json(calendarEvent);
    } catch (error) {
        res.status(500).json({ error: 'Could not create calendar event.' });
    }
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


