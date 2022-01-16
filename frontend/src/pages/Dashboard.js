import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MenuGrid from "../components/MenuGrid";

const Dashboard = () => {
    return (
        <Box>
            <Header />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Grid container justifyContent="center" columnSpacing={4}>
                    <Grid item>
                        <MenuGrid />
                    </Grid>
                    <Grid item>
                        <Box sx={{ mb: 2 }}>
                            <Link to="/marketplace">
                                <Button color="secondary" variant="outlined">
                                    Marketplace
                                </Button>
                            </Link>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Link to="/inventory">
                                <Button color="secondary" variant="outlined">
                                    Inventory
                                </Button>
                            </Link>
                        </Box>
                        <Box>
                            <Link to="/coin">
                                <Button color="secondary" variant="outlined">
                                    Buy Coin
                                </Button>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;
