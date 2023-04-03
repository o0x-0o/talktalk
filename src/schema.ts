import { buildSchema } from "graphql";
import { Snowflake } from "nodejs-snowflake";

import { User, Post } from "./model";

const uid = new Snowflake({ custom_epoch: 1617499753 });

const schema = buildSchema(`
	type User {
		id: String
		name: String
	}

	type Query {
		user(id: String): User
		users: [User]
	}

	type Mutation {
		createUser(username: String!): User
	}
`);

const resolvers = {
	user(obj: any) {
		const { id } = obj;

		return User.findOne({ id: id }).exec();
	},

	users() {
		return User.find({}).exec();
	},

	createUser(obj: any) {
		const { username } = obj;

		const id = uid.getUniqueID().toString();

		const user = new User({
			id: id,
			name: username
		});
		user.save();

		return user;
	}
};

export { schema, resolvers };
