import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const BoxerCard = ({ boxer: { name, healthPoints, attackPower, cardPicture } }) => {
    return (
        <Card sx={{ width: "10em" }}>
            <CardMedia component="img" image={cardPicture} />
            <CardContent>
                <Typography>{name}</Typography>
                <Typography>HP: {healthPoints}</Typography>
                <Typography>Power: {attackPower}</Typography>
            </CardContent>
        </Card>
    );
};

export default BoxerCard;
