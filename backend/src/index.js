import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-fastify";
import dotenv from "dotenv";
import fastify from "fastify";
import mongoose from "mongoose";
import { resolvers, types } from "./gql.js";

dotenv.config();

const PORT = process.env.PORT || 5555;

function fastifyAppClosePlugin(app) {
    return {
        async serverWillStart() {
            return {
                async drainServer() {
                    await app.close();
                },
            };
        },
    };
}

async function startServer() {
    const app = fastify();
    const server = new ApolloServer({
        typeDefs: types,
        resolvers: resolvers,
        plugins: [
            fastifyAppClosePlugin(app),
            ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
        ],
    });

    await server.start();
    app.register(server.createHandler({ path: "/gql" }));
    await app.listen(PORT);
    console.log(`Server ready at http://localhost:${PORT}/gql`);
}

mongoose
    .connect(
        "mongodb+srv://gacha4good:verygood@cluster0.bpxxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(startServer)
    .catch((err) => {
        console.error(err);
    });
