import HTTPException from "@/exceptions/http.exception";
import MovieModel from "@/models/movie.model";
import { MovieDto } from "@/schemas/movie.validation.schema";
import { isEmpty } from "@/utils/util";
import { StatusCodes } from "http-status-codes";

class MovieService {
	private movieModel = MovieModel;

	public createMovie = async (movieData: MovieDto): Promise<MovieDto> => {
		const movie = await this.movieModel.create(movieData);
		return movie;
	};

	public getMovie = async (id: string): Promise<MovieDto> => {
		if (isEmpty(id)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a movie ID");
		}
		const movie = await this.movieModel.findById(id);
		if (!movie) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Movie not found");
		}
		return movie;
	};

	public getMovies = async (): Promise<MovieDto[]> => {
		const movies = await this.movieModel.find();
		return movies;
	};
}

export default MovieService;
