import React, { useState } from "react";

import { Box, IconButton, Grid } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import BoxerCard from "./BoxerCard";

const ChooseBoxer = ({ boxers, chooseBoxer }) => {
    const [index, setIndex] = useState(0);

    const decreaseIndex = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(boxers.length - 1);
        }
    };

    const increaseIndex = () => {
        if (index < boxers.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    return (
        <Box sx={{ mt: 8 }}>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <IconButton color="secondary" onClick={decreaseIndex}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <div onClick={() => chooseBoxer(boxers[index])}>
                        <BoxerCard key={boxers[index].name} boxer={boxers[index]} />
                    </div>
                </Grid>
                <Grid item>
                    <IconButton color="secondary" onClick={increaseIndex}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ChooseBoxer;
