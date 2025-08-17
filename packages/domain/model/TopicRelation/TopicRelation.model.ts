import z from 'zod';

export const relationTypeSchema = z.enum(["PREREQUISITE", "RELATED"]);

export const topicRelationSchema = z.object({
    id: z.string().uuid(),
    source: z.string().uuid(),
    target: z.string().uuid(),
    type: relationTypeSchema
})

export type TopicRelation = z.infer<typeof topicRelationSchema>;
