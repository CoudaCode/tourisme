import { Schema, model } from "mongoose";
const hotelSchema = new Schema({
	admin: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Admin",
	},
	hotelName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	facilities: {
		type: String,
		required: true,
	},
	rules: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
		required: true,
	},
});

export default model("Hotel", hotelSchema);

