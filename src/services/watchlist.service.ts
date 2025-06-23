import WatchlistModel from "@/models/watchlist.model";
import { MovieDto } from "@/schemas/movie.validation.schema";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import MovieService from "./movie.service";
import { IWatchlist } from "@/interfaces/watchlist.interface";

class WatchlistService {
	private watchlistModel = WatchlistModel;
	private movieService = new MovieService();

	public createWatchlist = async (userId: string): Promise<IWatchlist> => {
		const existingWatchlist = await this.watchlistModel.findOne({
			user: userId,
		});
		if (existingWatchlist) {
			throw new HTTPException(
				StatusCodes.BAD_REQUEST,
				"Watchlist already exists for this user"
			);
		}
		const watchlist = await this.watchlistModel.create({
			user: userId,
		});
		return watchlist;
	};

	public getWatchlistsByUserId = async (
		userId: string
	): Promise<IWatchlist[]> => {
		return await this.watchlistModel.find({ user: userId }).populate("movies");
	};

	public addMovieToWatchlist = async (
		movie: MovieDto,
		userId: string
	): Promise<IWatchlist> => {
		let watchlist = await this.watchlistModel.findOne({
			userId,
		});
		if (!watchlist) {
			const newWatchlist = await this.createWatchlist(userId);

			if (!newWatchlist) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					"Failed to create watchlist"
				);
			}
		}

		const movieExists = await this.movieService.getMovie(movie.id);

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

		const watchlistId = watchlist?._id;
		watchlist = await this.watchlistModel.findByIdAndUpdate(
			watchlistId,
			{ $addToSet: { movies: movieExists?._id } },
			{ new: true }
		);

		if (!watchlist) {
			throw new HTTPException(
				StatusCodes.NOT_FOUND,
				"Failed to update watchlist"
			);
		}
		return watchlist;
	};

	public removeMovieFromWatchlist = async (
		userId: string,
		movieId: number
	): Promise<IWatchlist> => {
		if (!movieId) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Movie ID is required");
		}
		const movieExists = await this.movieService.getMovie(movieId);
		if (!movieExists) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Movie not found");
		}
		const watchlist = await this.watchlistModel.findOneAndUpdate(
			{ user: userId },
			{ $pull: { movies: movieExists._id } },
			{ new: true }
		);
		if (!watchlist) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Watchlist not found");
		}
		return watchlist;
	};
}

export default WatchlistService;
