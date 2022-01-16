import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoxerKing from "./pages/BoxerKing";
//import pages
import Coin from "./pages/Coin";
import { CreateBoxer } from "./pages/CreateBoxer";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Marketplace from "./pages/Marketplace";

// MUI theme configuration
const theme = createTheme({
    palette: {
        primary: {
            main: "#26354A",
        },
        secondary: {
            main: "#ffffff",
        },
        background: {
            default: "#26354A",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <Router>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/coin" element={<Coin />} />
                        <Route path="/inventory" element={<Inventory />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/boxer-king" element={<BoxerKing />} />
                        <Route path="/create-card" element={<CreateBoxer />} />
                    </Routes>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

export default App;
