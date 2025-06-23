import { IList } from "@/interfaces/list.interface";
import { model, Model, Schema } from "mongoose";

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
		},
		items: {
			type: [String],
			default: [],
		},
		userId: {
			type: String,
			default: null,
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
