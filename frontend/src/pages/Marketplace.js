import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { CardActionArea, DialogContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
const Marketplace = () => {
    const pack = ["bronze pack", "silver pack", "gold pack"];
    const price = ["5", "10", "15"];
    const color = ["#CD7F32", "#C0C0C0", "#FFD700"];

    const [counter, setCounter] = useState(1);
    const [buying, setBuying] = useState(false);
    const addCounter = (counter) => {
        setCounter(counter + 1);
    };

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
        return <Typography> card </Typography>;
    }
    return (
        <Grid container justify="flex-end">
            <Dialog open={open}>
                <DialogTitle>CONFIRM PURCHASE</DialogTitle>
                <DialogContent>Price: {price[counter]}</DialogContent>
                {/* Reduce balance */}
                <Button
                    onClick={() => {
                        setOpen(false);
                        setBuying(true);
                    }}
                    variant="contained"
                    style={{ backgroundColor: "#000000" }}
                >
                    CONFIRM
                </Button>
            </Dialog>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <IconButton onClick={() => setCounter(counter - 1)}>
                            {" "}
                            <ArrowBackIosNewIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Card
                            sx={{ width: 200, height: 300 }}
                            variant="outlined"
                            style={{ backgroundColor: color[counter] }}
                        >
                            <CardActionArea
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                <Typography align="center"> {pack[counter]} </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item>
                        <IconButton edge="end" onClick={() => setCounter(counter + 1)}>
                            {" "}
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Marketplace;
