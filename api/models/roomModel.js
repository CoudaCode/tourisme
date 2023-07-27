const mongoose = require("mongoose");
import {Schema, model} from "mongoose";
const roomSchema = new Schema({
	admin: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Admin",
	},
	hotel: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "Hotel",
	},
	roomType: {
		type: String,
		required: true,
	},
	availability: {
		type: Number,
		required: true,
	},
	beds: {
		type: String,
		required: true,
	},
	roomSize: {
		type: String,
		required: true,
	},
	roomFacilities: {
		type: String,
		required: true,
	},
	bathRoomFacilities: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	pic: {
		type: String,
		required: true,
	},
});

export default model("Room", roomSchema);