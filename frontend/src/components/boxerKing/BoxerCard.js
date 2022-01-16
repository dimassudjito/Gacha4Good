import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

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
