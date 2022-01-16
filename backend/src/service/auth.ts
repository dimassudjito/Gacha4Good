import { DocumentType } from "@typegoose/typegoose";
import { ContextFunction } from "apollo-server-core";
import { ExpressContext } from "apollo-server-express";
import { AuthChecker, Maybe } from "type-graphql";
import { User } from "../model/user";

export const TokenCache = new Map<string, DocumentType<User>>();

export interface AuthorizedContext {
    token: string;
    user: DocumentType<User>;
}

export const parseRequest: ContextFunction<ExpressContext, Maybe<AuthorizedContext>> = async ({
    req,
}) => {
    const receivedToken = req.header("Authorization")?.replace("Bearer ", "");
    if (TokenCache.has(receivedToken)) {
        return {
            token: receivedToken,
            user: TokenCache.get(receivedToken),
        };
    }
    return undefined;
};

export const tokenCheck: AuthChecker<string> = async (parsedData) => {
    if (parsedData.context) {
        return true;
    }
    return false;
};
