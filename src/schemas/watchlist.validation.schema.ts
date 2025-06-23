import { z } from "zod";

export const watchlistValidationSchema = z.object({
	user: z.string().optional(),
	isPublic: z.boolean().optional(),
	movies: z.array(z.string()).optional(),
});
export type CreateWatchlistDto = z.infer<typeof watchlistValidationSchema>;
