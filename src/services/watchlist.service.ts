import WatchlistModel from "@/models/watchlist.model";
import { MovieDto } from "@/schemas/movie.validation.schema";
import { WatchlistDto } from "@/schemas/watchlist.validation.schema";
import MovieService from "./movie.service";
import HTTPException from "@/exceptions/http.exception";
import { StatusCodes } from "http-status-codes";

class WatchlistService {
	private watchlistModel = WatchlistModel;
	private movieService = new MovieService();

	public createWatchlist = async (
		watchlistData: WatchlistDto
	): Promise<WatchlistDto> => {
		const watchlist = await this.watchlistModel.create(watchlistData);
		return watchlist;
	};

	public getWatchlistsByUserId = async (
		userId: string
	): Promise<WatchlistDto[]> => {
		return await this.watchlistModel.find({ userId });
	};

	public addMovieToWatchlist = async (
		movie: MovieDto,
		userId: string
	): Promise<WatchlistDto> => {
		let watchlist = await this.watchlistModel.findOne({
			userId,
		});

		if (!watchlist) {
			const newWatchlist = await this.createWatchlist({ userId });

			if (!newWatchlist) {
				throw new HTTPException(
					StatusCodes.BAD_REQUEST,
					"Failed to create watchlist"
				);
			}
		}

		const watchlistId = watchlist?._id;
		watchlist = await this.watchlistModel.findByIdAndUpdate(
			watchlistId,
			{ $addToSet: { movies: movie } },
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
		movieId: string
	): Promise<WatchlistDto> => {
		const watchlist = await this.watchlistModel.findByIdAndUpdate(
			userId,
			{ $pull: { movies: movieId } },
			{ new: true }
		);
		if (!watchlist) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Watchlist not found");
		}
		return watchlist;
	};
}

export default WatchlistService;
