import { z } from "zod";

export const listValidationSchema = z.object({
	userId: z.string().optional(),
	isPublic: z.boolean().optional(),
	name: z.string().min(3).max(255),
	description: z.string().max(1000).optional(),
	type: z.enum(["movie", "tv"]),
	items: z.array(z.string()).optional(),
	image: z.string().url().optional(),
});
export type ListDto = z.infer<typeof listValidationSchema>;
