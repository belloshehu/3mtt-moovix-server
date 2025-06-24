import { z } from "zod";
import { MovieDto, movieValidationSchema } from "./movie.validation.schema";

export const listCreateValidationSchema = z.object({
	user: z.string().optional(),
	isPublic: z.boolean().optional(),
	name: z.string().min(3).max(255),
	description: z.string().max(1000).optional(),
	type: z.enum(["movie", "tv"]).default("movie"),
	items: z.array(z.string()).optional(),
	image: z.string().url().optional(),
});
export type ListCreateDto = z.infer<typeof listCreateValidationSchema>;

export const listUpdateValidationSchema = z.object({
	user: z.string().optional(),
	isPublic: z.boolean().optional(),
	name: z.string().min(3).max(255),
	description: z.string().max(1000).optional(),
	type: z.enum(["movie", "tv"]),
	items: z.array(z.string()).optional(),
	image: z.string().url().optional(),
});

export type ListUpdateDto = z.infer<typeof listUpdateValidationSchema>;

export const addListItemValidationSchema = movieValidationSchema;
export type AddListItemDto = MovieDto;
