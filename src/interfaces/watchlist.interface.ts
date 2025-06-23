import { Schema } from "mongoose";

export interface IWatchlist {
	_id: string;
	createdAt?: Date; // Optional creation date
	updatedAt?: Date; // Optional last updated date
	user?: string; // Optional, if the watchlist is associated with a user
	isPublic?: boolean; // Optional, to indicate if the watchlist is public or private
	movies: Schema.Types.ObjectId[] | []; // Array of movie IDs in the watchlist
}
