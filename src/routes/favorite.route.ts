import { Routes } from "@/interfaces/route.interface";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { movieValidationSchema } from "@/schemas/movie.validation.schema";
import { favoriteValidationSchema } from "@/schemas/favorite.validation.schema";
import { Router } from "express";
import FavoriteController from "@/controllers/favorite.controller";

class FavoriteRoutes implements Routes {
	public path = "/favorites";
	public router = Router();
	public favoriteController = new FavoriteController();

	constructor() {
		this.initializeRoutes();
	}

	public initializeRoutes() {
		// Define your favorite routes here
		this.router.post(
			`${this.path}`,
			[authMiddleware, validationMiddleware(favoriteValidationSchema, "body")],
			this.favoriteController.createFavorite
		);
		this.router.get(
			`${this.path}`,
			authMiddleware,
			this.favoriteController.getFavoritesByUserId
		);
		this.router.post(
			`${this.path}/add`,
			[authMiddleware, validationMiddleware(movieValidationSchema, "body")],
			this.favoriteController.addMovieToFavorite
		);
		this.router.delete(
			`${this.path}/remove/:movieId`,
			authMiddleware,
			this.favoriteController.removeMovieFromFavorite
		);
		this.router.delete(
			`${this.path}/clear`,
			authMiddleware,
			this.favoriteController.clearFavorite
		);
	}

	public getRouter() {
		return this.router;
	}
}

export default FavoriteRoutes;
