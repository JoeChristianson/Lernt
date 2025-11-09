import { z } from "zod";
import { UserModel } from "./User.model";
export namespace UserDTO {

    /// Register

    export const RegisterPayloadSchema = UserModel.Schema.pick({
        name: true,
        email: true,
    }).extend({
        password: z.string().min(8).max(1000),
        confirmPassword: z.string().min(8).max(1000),
    })
    export type RegisterPayload = typeof RegisterPayloadSchema._type;

    export const RegisterReturnSchema = UserModel.Schema.omit({
        password: true,
    });

    export type RegisterReturn = typeof RegisterReturnSchema._type;

    /// Login

    export const LoginPayloadSchema = UserModel.Schema.pick({
        email: true,
        password: true,
    });

    export type LoginPayload = typeof LoginPayloadSchema._type;

    export const LoginReturnSchema = UserModel.Schema.omit({
        password: true,
    });

    export type LoginReturn = typeof LoginReturnSchema._type;
}
