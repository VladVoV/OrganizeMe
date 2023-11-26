const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://vladvojch:DijavVDLMRvhogtm@cluster0.z6gxgmw.mongodb.net/to-do_list', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

app.use(bodyParser.json());

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


app.listen(port, () => console.log(`Listening on port ${port}`));


