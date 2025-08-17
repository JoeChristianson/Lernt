import z from 'zod';

export const resourceTypeSchema = z.enum(["ARTICLE", "VIDEO", "PODCAST", "BOOK"]);


export const resourceSchema = z.object({
    id: z.string().uuid(),
    label: z.string().min(2).max(100),
    type: resourceTypeSchema,
    url: z.string().url()
})

export type Resource = z.infer<typeof resourceSchema>;
