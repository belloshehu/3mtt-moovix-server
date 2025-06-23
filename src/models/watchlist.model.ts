import { IWatchlist } from "@/interfaces/watchlist.interface";
import { model, Model, Schema } from "mongoose";

type WatchlistModelType = Model<IWatchlist>;

const WatchlistSchema = new Schema<IWatchlist, WatchlistModelType>(
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
WatchlistSchema.index({ user: 1 }, { unique: true }); // Index for faster queries

const WatchlistModel = model<IWatchlist, WatchlistModelType>(
	"Watchlist",
	WatchlistSchema
);

export default WatchlistModel;
