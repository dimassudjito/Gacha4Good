import React from "react";

import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const BoxerCard = ({ boxer: { name, hp, power, img } }) => {
    return (
        <Card sx={{ width: "10em" }}>
            <CardMedia component="img" image={img} />
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>HP: {hp}</Typography>
                <Typography>Power: {power}</Typography>
            </CardContent>
        </Card>
    );
};

export default BoxerCard;
