export interface IWatchlist {
	createdAt?: Date; // Optional creation date
	updatedAt?: Date; // Optional last updated date
	userId?: string; // Optional, if the watchlist is associated with a user
	isPublic?: boolean; // Optional, to indicate if the watchlist is public or private
	movies: string[]; // Array of movie IDs in the watchlist
}
