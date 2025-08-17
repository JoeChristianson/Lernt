import z from "zod"
import { resourceSchema } from "../Resource"
import { tagSchema } from "../Tag/"
import { topicRelationSchema } from "../TopicRelation"

export const topicStatusSchema = z.enum(["DRAFT","NEW","IN_PROGRESS","FAILED","COMPLETED"])

export type TopicStatus = z.infer<typeof topicStatusSchema>

export const topicSchema = z.object({
    id: z.string().uuid(),
    label: z.string().min(2).max(100),
    status: topicStatusSchema,
})

export type Topic = z.infer<typeof topicSchema>

const relatedTopicSchema = topicSchema.extend({
    relation: z.array(topicRelationSchema)
})

export const populatedTopicSchema = topicSchema.extend({
    tags: z.array(tagSchema),
    resources: z.array(resourceSchema),
    relatedTopics: z.array(relatedTopicSchema)
})

export type PopulatedTopic = z.infer<typeof populatedTopicSchema>