import { IList } from "@/interfaces/list.interface";
import { model, Model, Schema, SchemaType } from "mongoose";

type ListModelType = Model<IList, {}, {}>;
const ListSchema = new Schema<IList, ListModelType>(
	{
		name: {
			type: String,
			required: [true, "List name is required"],
			trim: true,
		},
		description: {
			type: String,
			trim: true,
			default: "",
		},
		type: {
			type: String,
			enum: ["movie", "tv"],
			required: [true, "Type is required"],
			default: "movie",
		},
		items: {
			type: [{ type: Schema.Types.ObjectId, ref: "Movie" }], // Assuming items are references to Movie model
			default: [],
		},
		user: {
			type: String,
			default: null,
			ref: "User", // Reference to User model if applicable
			required: [true, "User ID is required"],
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		image: {
			type: String,
			default: "",
		},
	},
	{
		timestamps: true,
	}
);

const ListModel = model<IList, ListModelType>("List", ListSchema);
export default ListModel;
