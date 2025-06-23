import MovieController from "@/controllers/movies.controller";
import { Routes } from "@/interfaces/route.interface";
import { Router } from "express";

class MovieRoute implements Routes {
	path = "/movies";
	router = Router();
	private movieController = new MovieController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		// Define your movie routes here
		// Example:
		// this.router.get(`${this.path}`, this.getMovies);
		// this.router.post(`${this.path}`, this.createMovie);
		// this.router.get(`${this.path}/:id`, this.getMovie);
		this.router.post(`${this.path}`, this.movieController.createMovie);
		this.router.get(`${this.path}`, this.movieController.getMovies);
		this.router.get(`${this.path}/:id`, this.movieController.getMovie);
		// Add more routes as needed
	}
}

export default MovieRoute;
