import type { UserDTO } from "@lernt/domain";
import bcrypt from "bcryptjs";
import type { ServiceDeps } from "../../../Service";
import { UserDAL } from "../../../data-access/User.DAL/User.DAL";

export const loginM = async (deps: ServiceDeps, payload: UserDTO.LoginPayload): Promise<UserDTO.LoginReturn> => {
    if (deps._tag === "sessioned") {
        throw new Error("Cannot login a user when already authenticated");
    }
    const userDAL = UserDAL(deps);

    const user = await userDAL.getUserByEmail(payload.email);
    if (!user) {
        throw new Error("User not found");
    }

    // OAuth users don't have passwords - they must sign in via OAuth provider
    if (!user.password) {
        throw new Error("This account uses OAuth authentication. Please sign in with Google or GitHub.");
    }

    const isPasswordValid = bcrypt.compareSync(payload.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
    };
};