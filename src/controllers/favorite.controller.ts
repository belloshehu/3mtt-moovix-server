import { RequestWithUser } from "@/interfaces/auth.interface";
import FavoriteService from "@/services/favorite.service";
import { NextFunction, Response } from "express";

class FavoriteController {
	private FavoriteService = new FavoriteService();

	public createFavorite = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Favorite = await this.FavoriteService.createFavorite(req.user?._id);
			res.status(201).json(Favorite);
		} catch (error) {
			next(error);
		}
	};

	public getFavoritesByUserId = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Favorites = await this.FavoriteService.getFavoriteByUserId(
				req.user?._id
			);
			res.status(200).json({ data: Favorites });
		} catch (error) {
			next(error);
		}
	};

	public addMovieToFavorite = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const movie = req.body;
			const Favorite = await this.FavoriteService.addMovieToFavorite(
				movie,
				req.user?._id
			);
			res
				.status(200)
				.json({ data: Favorite, message: "Movie added to Favorite" });
		} catch (error) {
			next(error);
		}
	};

	public removeMovieFromFavorite = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { movieId } = req.params;
			const Favorite = await this.FavoriteService.removeMovieFromFavorite(
				req.user?._id,
				Number(movieId)
			);
			res
				.status(200)
				.json({ data: Favorite, message: "Movie removed from Favorite" });
		} catch (error) {
			next(error);
		}
	};

	// clear favorites for a user
	public clearFavorite = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const Favorite = await this.FavoriteService.clearFavorite(req.user?._id);
			res.status(200).json({ data: Favorite, message: "Favorite cleared" });
		} catch (error) {
			next(error);
		}
	};
}

export default FavoriteController;
