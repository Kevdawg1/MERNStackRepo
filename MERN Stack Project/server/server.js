const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

require('dotenv').config();

const startServer = async () => {
    const server = new ApolloServer({ typeDefs, resolvers });

    const app = express();
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

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();