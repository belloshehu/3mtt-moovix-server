export interface List {
	name: string;
	description?: string;
	type: "movie" | "tv";
	items: string[]; // Array of movie or TV show IDs
	createdAt?: Date;
	updatedAt?: Date;
	userId?: string; // Optional, if the list is associated with a user
	isPublic?: boolean; // Optional, to indicate if the list is public or private
	image?: string; // Optional, to store an image for the list
}
