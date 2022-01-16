import React from "react";
import { Link } from "react-router-dom";

import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

const MenuGrid = () => {
    return (
        <Box>
            <Grid container rowSpacing={2}>
                <Grid item xs={4}>
                    <Card sx={{ width: "3em", height: "3em" }}>
                        <Link to="/boxer-king">
                            <CardMedia component="img" image="/boxing-glove.png" />
                        </Link>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ width: "3em", height: "3em" }}>
                        <CardMedia component="img" image="/pencil.png" />
                    </Card>
                </Grid>
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <Grid key={item} item xs={4}>
                        <Card sx={{ width: "3em", height: "3em" }}></Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MenuGrid;
