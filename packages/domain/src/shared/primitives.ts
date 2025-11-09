import z from "zod";

export const zDate = z.date()

export const zId = z.string().uuid()

export const zEmail = z.string()
export const zPassword = z
    .string()
    .min(2)
    .max(1000)
    .refine((val) => {
        // Password must be hashed
        return val.length > 20;
    })

// TODO: Need further refinements for uppercase, lowercase, number and special characters

export const zUnhashedPassword = z
    .string()
    .min(2)
    .max(100)
    .refine((val) => {
        // Password must be hashed
        return val.length > 7;
    })

export const zUrl = z.string().url()

export const zLongText = z.string()

export enum ContentStateEnum {
    DRAFT = "DRAFT",
    SAVED = "SAVED",
    DELETED = "DELETED"
}

// TODO: fix this derivation
export const contentStates = ["DRAFT", "SAVED", "DELETED"] as const

export const zContentState = z.enum(contentStates)