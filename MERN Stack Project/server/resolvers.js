const { User } = require("./models/user.model");

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        users: () => User.find()
    },
};

module.exports = resolvers;