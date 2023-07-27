/**
 * This model is implemented for
 * the Customer
 */
import { Schema, model } from "mongoose";

const customerSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		telephone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		pic: {
			type: String,
			required: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", //default image which apply in the user
		},
		regDate: {
			type: String,
			default: new Date(),
		},
	},
	{
		timestamps: true,
	}
);

export default model("Customer", customerSchema);

