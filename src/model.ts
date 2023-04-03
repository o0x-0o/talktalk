import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/talktalk");
const { Schema } = mongoose;

const User = mongoose.model(
	"User",
	new Schema({
		id: Number,
		name: String
	})
);

const Post = mongoose.model(
	"Post",
	new Schema({
		id: Number,
		title: String,
		author: Number,
		date: { type: Date, default: Date.now },
		body: String
	})
);

export { User, Post };
