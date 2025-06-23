import WatchlistController from "@/controllers/watchlist.controller";
import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { movieValidationSchema } from "@/schemas/movie.validation.schema";
import { watchlistValidationSchema } from "@/schemas/watchlist.validation.schema";
import { Router } from "express";

class WatchlistRoute implements Routes {
	public path = "/watchlist";
	public router = Router();
	public watchlistController = new WatchlistController();

	constructor() {
		this.initializeRoutes();
	}

	public initializeRoutes() {
		// Define your watchlist routes here
		this.router.post(
			`${this.path}`,
			[authMiddleware, validationMiddleware(watchlistValidationSchema, "body")],
			this.watchlistController.createWatchlist
		);
		this.router.get(
			`${this.path}`,
			authMiddleware,
			this.watchlistController.getWatchlistsByUserId
		);
		this.router.post(
			`${this.path}/add`,
			[authMiddleware, validationMiddleware(movieValidationSchema, "body")],
			this.watchlistController.addMovieToWatchlist
		);
		this.router.delete(
			`${this.path}/remove/:movieId`,
			authMiddleware,
			this.watchlistController.removeMovieFromWatchlist
		);
	}

	public getRouter() {
		return this.router;
	}
}

export default WatchlistRoute;
