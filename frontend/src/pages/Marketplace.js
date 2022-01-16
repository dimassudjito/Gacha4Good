import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useEffect, useState } from "react";
import { CardActionArea, DialogContent, Typography } from '@mui/material';
const Marketplace = () => {
    const pack = ["bronze pack", "silver pack", "gold pack"]
    const price = ["5", "10", "15"]
    const color = ["#CD7F32", "#C0C0C0", "#FFD700"]

    const [counter, setCounter] = useState(1)
    const [buying, setBuying] = useState(false)
    const addCounter = (counter) => {
        setCounter(counter + 1)
    }

    useEffect(() => {
        if (counter < 0) {
            setCounter(0);
        }
        if (counter > 2) {
            setCounter(2);
        }
    }, [counter]);
    const [open, setOpen] = React.useState(false);
    if (buying) {
        return (
            <Typography> card </Typography>
        )
    }
    return (
        <Grid container justify="flex-end">
            < Dialog open={open}>
                <DialogTitle>
                    CONFIRM PURCHASE
                </DialogTitle>
                <DialogContent>
                    Price: {price[counter]}
                </DialogContent>
                {/* Reduce balance */}
                <Button onClick={() => {
                    setOpen(false)
                    setBuying(true)
                }
                } variant="contained" style={{ backgroundColor: "#000000" }}>
                    CONFIRM
                </Button>
            </Dialog >
            <Card variant="outlined" style={{ backgroundColor: color[counter] }}>
                <CardActionArea onClick={() => {
                    setOpen(true)
                }}>
                    <CardContent />
                </CardActionArea>
            </Card>
            <IconButton onClick={() => setCounter(counter - 1)} > <ArrowBackIosNewIcon /></IconButton>
            <p> {pack[counter]} </p>
            <IconButton onClick={() => setCounter(counter + 1)}> <ArrowForwardIosIcon /></IconButton>
        </Grid>
    )
}


export default Marketplace