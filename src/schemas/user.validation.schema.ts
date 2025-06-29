import z from "zod";

export const createUserValidationSchema = z.object({
	name: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(6).max(255),
	lastName: z.string().min(3).max(255),
	firstName: z.string().min(3).max(255),
	role: z.enum(["user", "admin", "partner"]).default("user"),
	verified: z.boolean().default(false),
	varificationToken: z.string().optional(),
	varificationTokenExpiresBy: z.number().optional(),
	following: z.array(z.string()).optional(),
	followers: z.array(z.string()).optional(),
});

export type CreateUserDto = z.infer<typeof createUserValidationSchema>;

// schema for user fetch filter
export const userFetchFilterSchema = z.object({
	verified: z.boolean().optional(),
	role: z.enum(["user", "admin", "partner"]).optional(),
	page: z.number().optional(),
	limit: z.number().optional(),
	search: z.string().optional(),
});
export type UserFetchFilterType = z.infer<typeof userFetchFilterSchema>;
