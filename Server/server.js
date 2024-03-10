const express = require('express');
const cookieSession = require("cookie-session");
const cors = require("cors");
require('dotenv').config();

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
    .connect(process.env.DB_MONGOOSE, {
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

async function initial() {
    try {
        const count = await Role.estimatedDocumentCount();

        if (count === 0) {
            await Promise.all([
                new Role({ name: "user" }).save(),
                new Role({ name: "moderator" }).save(),
                new Role({ name: "admin" }).save()
            ]);

            console.log("Roles added to the roles collection");
        }
    } catch (err) {
        console.error("Error during initialization:", err);
    }
}

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/todo.routes')(app);
require('./routes/calendar.routes')(app);
require('./routes/posts.routes')(app);
require('./routes/replies.routes')(app);
require('./routes/tags.routes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


