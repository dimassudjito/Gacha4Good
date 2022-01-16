import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { store } from "./state/store";

// Default font: ubuntu
import "@fontsource/ubuntu/300.css";
import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/500.css";
import "@fontsource/ubuntu/700.css";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
