import React, { useState } from "react";

import { Box, IconButton, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import BoxerCard from "./BoxerCard";

const ChooseBoxer = ({ boxers }) => {
    const [index, setIndex] = useState(0);

    return (
        <Box sx={{ mt: 8 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <IconButton color="secondary" onClick={() => setIndex(index - 1)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <BoxerCard key={boxers[index].name} boxer={boxers[index]} />
                </Grid>
                <Grid item>
                    <IconButton color="secondary" onClick={() => setIndex(index - 1)}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChooseBoxer;
