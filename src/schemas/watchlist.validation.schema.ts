import { z } from "zod";

export const watchlistValidationSchema = z.object({
	userId: z.string().optional(),
	isPublic: z.boolean().optional(),
	movies: z.array(z.string()).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});
export type WatchlistDto = z.infer<typeof watchlistValidationSchema>;
