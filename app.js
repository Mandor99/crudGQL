// const DB_URL = 'mongodb://localhost:27017/E-commarce1';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const gqlSchema = require('./graphQl/schema');

app.use(cors());

mongoose.connect(
	'mongodb://localhost:27017/CRUDGRAPHQL',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => console.log('DataBase is connected'),
);
// mongoose.connection.once('open', () => console.log('connected to DB'));

app.use(
	'/graphql',
	graphqlHTTP({
		schema: gqlSchema,
		graphiql: true,
	}),
);

app.listen(5000, () => console.log('server listen on port 5000 ...'));
