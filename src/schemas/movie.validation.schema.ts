import { z } from "zod";

export const movieValidationSchema = z.object({
	id: z.number(),
	title: z.string().min(1).max(255),
	overview: z.string().max(1000).optional(),
	release_date: z.string().optional(),
	runtime: z.number().int().optional(),
	adult: z.boolean().default(false),
	vote_count: z.number().int().default(0),
	vote_average: z.number().min(0).max(10).default(0),
	budget: z.number().int().optional(),
	genres_ids: z
		.array(z.object({ id: z.number(), name: z.string() }))
		.optional(),
	poster_path: z.string().optional(),
	backdrop_path: z.string().optional(),
	original_language: z.string().max(10).optional(),
	original_title: z.string().max(255).optional(),
	popularity: z.number().min(0).default(0),
	video: z.boolean().default(true),
});
export type MovieDto = z.infer<typeof movieValidationSchema>;
