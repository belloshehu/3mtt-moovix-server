import FavoriteModel from "@/models/favorite.model";
import { MovieDto } from "@/schemas/movie.validation.schema";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import MovieService from "./movie.service";
import { IFavorite } from "@/interfaces/favorite.interface";
import MovieModel from "@/models/movie.model";

class FavoriteService {
	private FavoriteModel = FavoriteModel;
	private movieService = new MovieService();
	private movieModel = MovieModel;

	public createFavorite = async (userId: string): Promise<IFavorite> => {
		const existingFavorite = await this.FavoriteModel.findOne({
			user: userId,
		});
		if (existingFavorite) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Favorite already exists for this user"
			);
		}
		const Favorite = await this.FavoriteModel.create({
			user: userId,
		});
		return Favorite;
	};

	public getFavoriteByUserId = async (userId: string): Promise<IFavorite> => {
		const Favorite = await this.FavoriteModel.findOne({
			user: userId,
		}).populate("movies");
		if (!Favorite) {
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Favorite not found for this user"
			);
		}
		return Favorite;
	};

	public addMovieToFavorite = async (
		movie: MovieDto,
		userId: string
	): Promise<IFavorite> => {
		let Favorite = await this.FavoriteModel.findOne({
			userId,
		});
		if (!Favorite) {
			const newFavorite = await this.createFavorite(userId);

			if (!newFavorite) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					"Failed to create Favorite"
				);
			}
		}

		const movieExists = await this.movieModel.findOne({ id: movie.id });

		if (!movieExists) {
			// add  movie to database
			const createdMovie = await this.movieService.createMovie(movie);
			if (!createdMovie) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					"Failed to create movie"
				);
			}
		}

		const FavoriteId = Favorite?._id;
		Favorite = await this.FavoriteModel.findByIdAndUpdate(
			FavoriteId,
			{ $addToSet: { movies: movieExists?._id } },
			{ new: true }
		);

		if (!Favorite) {
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Failed to update Favorite"
			);
		}
		return Favorite;
	};

	public removeMovieFromFavorite = async (
		userId: string,
		movieId: number
	): Promise<IFavorite> => {
		if (!movieId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Movie ID is required");
		}
		const movieExists = await this.movieService.getMovie(movieId);
		if (!movieExists) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Movie not found");
		}
		const Favorite = await this.FavoriteModel.findOneAndUpdate(
			{ user: userId },
			{ $pull: { movies: movieExists._id } },
			{ new: true }
		);
		if (!Favorite) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Favorite not found");
		}
		return Favorite;
	};

	// clear favorites for a user
	public clearFavorite = async (userId: string): Promise<IFavorite> => {
		const Favorite = await this.FavoriteModel.findOneAndUpdate(
			{ user: userId },
			{ $set: { movies: [] } },
			{ new: true }
		);
		if (!Favorite) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Favorite not found");
		}
		return Favorite;
	};
}

export default FavoriteService;
