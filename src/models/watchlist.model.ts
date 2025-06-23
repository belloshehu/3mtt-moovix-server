import { IWatchlist } from "@/interfaces/watchlist.interface";
import { model, Model, Schema } from "mongoose";

type WatchlistModelType = Model<IWatchlist, {}, {}>;

const WatchlistSchema = new Schema<IWatchlist, WatchlistModelType>(
	{
		movies: {
			type: [String],
			required: [true, "Movies array is required"],
			default: [],
		},
		userId: {
			type: String,
			required: false,
			default: null,
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

const WatchlistModel = model<IWatchlist, WatchlistModelType>(
	"Watchlist",
	WatchlistSchema
);

export default WatchlistModel;
