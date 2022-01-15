import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5555;

const server = new ApolloServer({
    types,
    resolvers,
});

mongoose
    .connect(
        "mongodb+srv://gacha4good:verygood@cluster0.bpxxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("MongoDB: database connected");
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server is running at ${res.url}`);
    })
    .catch((err) => {
        console.error(err);
    });
