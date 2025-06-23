import { IMovie } from "@/interfaces/movie.interface";
import { model, Model, Schema } from "mongoose";
type MovieModelType = Model<IMovie>;
const MovieSchema = new Schema<IMovie, MovieModelType>(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
			trim: true,
		},
		overview: {
			type: String,
			required: [true, "Overview is required"],
			trim: true,
		},
		release_date: {
			type: String,
			trim: true,
			required: [true, "Release date is required"],
		},

		poster_path: {
			type: String,
			required: [true, "Image URL is required"],
		},
		backdrop_path: {
			type: String,
			required: false,
		},
		adult: {
			type: Boolean,
			default: false,
		},
		genre_ids: {
			type: [String],
			required: true,
		},
		original_language: {
			type: String,
			required: [true, "Original language is required"],
		},
		original_title: {
			type: String,
			required: [true, "Original title is required"],
		},
		popularity: {
			type: Number,
			default: 0,
		},
		vote_average: {
			type: Number,
			default: 0,
		},
		vote_count: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);
// create index such that id is unique
MovieSchema.index({ id: 1 }, { unique: true });
const MovieModel = model<IMovie, MovieModelType>("Movie", MovieSchema);
export default MovieModel;
