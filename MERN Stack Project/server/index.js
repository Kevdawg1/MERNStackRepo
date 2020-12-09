const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const postRoutes = require('./routes/posts.js');

require('dotenv').config();

const app = express();

// all routes must start with post
// localhost:5000/posts
// app.use('/posts', postRoutes)

// limitations on data and image requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// https://www.mongodb.com/cloud/atlas
const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT || 5000;

// second parameter is to avoid errors in console
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.log(error.message));

// avoid warning in console
mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


