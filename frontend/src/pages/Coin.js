import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Coin = () => {
    return (
        <Box>
            <Header />
            <Grid
                justify="space-between"
                spacing={3}
                sx={{ mt: 20 }}
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Link to="/payment">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            component="img"
                            sx={{
                                height: 225,
                                width: 250,
                            }}
                            alt="1000coins."
                            src="/1000coins.png"
                        />
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/payment">
                        <Box
                            component="img"
                            sx={{
                                height: 225,
                                width: 250,
                            }}
                            alt="10000coins."
                            src="/10000coins.png"
                        />
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/payment">
                        <Box
                            component="img"
                            sx={{
                                height: 225,
                                width: 250,
                            }}
                            alt="25000coins."
                            src="/25000coins.png"
                        />
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Coin;
