const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const secret = require('./secret');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(secret.mlabLink, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server stated on port ${PORT}`))