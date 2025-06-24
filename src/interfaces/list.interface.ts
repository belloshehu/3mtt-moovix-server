import mongoose from "mongoose";

export interface IList {
	_id: string;
	name: string;
	description?: string;
	type: "movie" | "tv";
	items: mongoose.Schema.Types.ObjectId[] | []; // Array of movie or TV show IDs
	createdAt?: Date;
	updatedAt?: Date;
	user?: string; // Optional, if the list is associated with a user
	isPublic?: boolean; // Optional, to indicate if the list is public or private
	image?: string; // Optional, to store an image for the list
}
