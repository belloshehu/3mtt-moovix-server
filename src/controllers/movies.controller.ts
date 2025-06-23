import MovieService from "@/services/movie.service";
import { NextFunction, Response, Request } from "express";

class MovieController {
	private movieService = new MovieService();

	public createMovie = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const movieData = req.body;
			const createdMovie = await this.movieService.createMovie(movieData);
			res.status(201).json(createdMovie);
		} catch (error) {
			next(error);
		}
	};

	public getMovie = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const movieId = req.params.id;
			const movie = await this.movieService.getMovie(movieId);
			res.status(200).json(movie);
		} catch (error) {
			next(error);
		}
	};

	public getMovies = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const movies = await this.movieService.getMovies();
			res.status(200).json(movies);
		} catch (error) {
			next(error);
		}
	};
}

export default MovieController;
