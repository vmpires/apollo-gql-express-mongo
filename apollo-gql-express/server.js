const express = require('express');
const mongoose = require('mongoose')
const { ApolloServer, gql} = require('apollo-server-express');
const typeDefs = require('./typesDefs');
const resolvers = require('./resolvers');
require('dotenv/config');

async function startServer() {
    const app = express()
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })

    app.use((req,res) => {
        res.send("Hello from express apollo server ")
    })

    await mongoose.connect(
        process.env.DB_CONNECT,
        { useUnifiedTopology: true },
        { useNewUrlParser: true });
    
    console.log('Mongoose connected...')

    app.listen(4000, () => console.log("Server is running at 4000"))
};

startServer();