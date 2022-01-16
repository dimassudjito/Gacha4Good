// Default font: ubuntu
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const apolloClient = new ApolloClient({
    uri: "http://127.0.0.1:5555/",
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
