import { gql, useQuery } from "@apollo/client";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DialogContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import BoxerCard from "../components/boxerKing/BoxerCard";
import Header from "../components/Header";

const GET_PACKS = gql`
    query GetPacks {
        packs {
            _id
            name
            price
            cards {
                card
                rate
            }
        }
    }
`;

const Marketplace = () => {
    const { loading, error, data } = useQuery(GET_PACKS);

    const packs = data.packs;

    const color = ["#CD7F32", "#C0C0C0", "#FFD700"];

    const [counter, setCounter] = useState(1);
    const [buying, setBuying] = useState(false);
    const [open, setOpen] = React.useState(false);

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

    return (
        <Box>
            <Header />
            <Typography color="secondary">test data:</Typography>
            <Grid
                justify="space-between"
                spacing={3}
                sx={{ mt: 20 }}
                container
                justifyContent="center"
                alignItems="center"
            >
                {buying ? (
                    <BoxerCard
                        boxer={{
                            name: "Mike Tyson",
                            hp: 100,
                            power: 25,
                            img: "https://cdn.vox-cdn.com/thumbor/LtQtXYaj-suLI0jKUBLE-Fx2O9s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22127884/1288364271.jpg",
                            head_img:
                                "https://boxrec.com/media/images//thumb/9/94/MikeTysonHeadshot2.jpg/250px-MikeTysonHeadshot2.jpg",
                        }}
                    ></BoxerCard>
                ) : (
                    <Box>
                        <Dialog open={open}>
                            <DialogTitle>Confirm Purchase</DialogTitle>
                            <DialogContent>Price: {price[counter]}</DialogContent>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    setBuying(true);
                                }}
                                variant="contained"
                                style={{ backgroundColor: "#000000" }}
                            >
                                Confirm
                            </Button>
                        </Dialog>
                        <Grid item>
                            <Grid container alignItems="center">
                                <Grid item>
                                    <IconButton onClick={() => setCounter(counter - 1)}>
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <div
                                        onClick={() => {
                                            setOpen(true);
                                        }}
                                    >
                                        <Card
                                            sx={{ width: 200, height: 300 }}
                                            variant="outlined"
                                            style={{ backgroundColor: color[counter] }}
                                        >
                                            <Typography align="center">
                                                {" "}
                                                {pack[counter]}{" "}
                                            </Typography>
                                        </Card>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <IconButton edge="end" onClick={() => setCounter(counter + 1)}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default Marketplace;
