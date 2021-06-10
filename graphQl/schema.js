const graphql = require('graphql');
const bookDB = require('../models/book');
const authorDB = require('../models/author');
const {
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
} = graphql;

//types
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return authorDB.findById(parent.authorId);
			},
		},
	}),
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return bookDB.find({ authorId: parent.id });
			},
		},
	}),
});

//root || query
const RootQuery = new GraphQLObjectType({
	name: 'Root',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return bookDB.findById(args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return authorDB.findById(args.id);
			},
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return bookDB.find({});
			},
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authorDB.find({});
			},
		},
	},
});

//mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let Book = new bookDB({
					name: args.name,
					genre: args.genre,
					authorId: args.authorId,
				});
				return Book.save();
			},
		},
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				let Author = new authorDB({
					name: args.name,
					age: args.age,
				});
				return Author.save();
			},
		},
	},
});

//schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
