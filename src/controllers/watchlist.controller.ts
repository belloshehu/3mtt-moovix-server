import { RequestWithUser } from "@/interfaces/auth.interface";
import WatchlistService from "@/services/watchlist.service";
import { NextFunction, Response } from "express";

class WatchlistController {
	private watchlistService = new WatchlistService();

	public createWatchlist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const watchlist = await this.watchlistService.createWatchlist(
				req.user?._id
			);
			res.status(201).json(watchlist);
		} catch (error) {
			next(error);
		}
	};

	public getWatchlistsByUserId = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const watchlists = await this.watchlistService.getWatchlistsByUserId(
				req.user?._id
			);
			res.status(200).json(watchlists);
		} catch (error) {
			next(error);
		}
	};

	public addMovieToWatchlist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const movie = req.body;
			const watchlist = await this.watchlistService.addMovieToWatchlist(
				movie,
				req.user?._id
			);
			res.status(200).json(watchlist);
		} catch (error) {
			next(error);
		}
	};

	public removeMovieFromWatchlist = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { movieId } = req.params;
			const watchlist = await this.watchlistService.removeMovieFromWatchlist(
				req.user?._id,
				Number(movieId)
			);
			res.status(200).json(watchlist);
		} catch (error) {
			next(error);
		}
	};
}

export default WatchlistController;
