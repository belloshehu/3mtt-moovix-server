import { IFavorite } from "@/interfaces/favorite.interface";
import { model, Model, Schema } from "mongoose";

type FavoriteModelType = Model<IFavorite>;

const FavoriteSchema = new Schema<IFavorite, FavoriteModelType>(
	{
		movies: {
			type: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
			required: [true, "Movies array is required"],
			default: [],
		},
		user: {
			type: String,
			required: false,
			default: null,
			ref: "User", // Reference to User model if applicable
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);
FavoriteSchema.index({ user: 1 }, { unique: true }); // Index for faster queries

const FavoriteModel = model<IFavorite, FavoriteModelType>(
	"Favorite",
	FavoriteSchema
);

export default FavoriteModel;
