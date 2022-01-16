import { gql, useMutation, useQuery } from "@apollo/client";
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
        }
    }
`;

const BUY_PACK = gql`
    mutation BuyPack($packId: String!, $userId: String!) {
        buyPack(packId: $packId, userId: $userId) {
            _id
            name
            healthPoints
            attackPower
            cardPicture
            headPicture
        }
    }
`;

const Marketplace = () => {
    const [counter, setCounter] = useState(1);
    const [open, setOpen] = useState(false);
    const [bought, setBought] = useState(false);
    const [boughtCard, setBoughtCard] = useState({});

    const { loading, error, data } = useQuery(GET_PACKS);
    const [buyPackMut, { packData, loadingMut, errorMut }] = useMutation(BUY_PACK, {
        ignoreResults: false,
        onCompleted: (card) => {
            setBoughtCard(card.buyPack);
            setBought(true);
        },
    });

    const color = ["#CD7F32", "#C0C0C0", "#FFD700"];
    const color_name = ["bronze", "silver", "gold"];
    const pack_price = ["1000", "10000", "25000"];

    // 0= silver, 1 = gold, 2 = bronze
    // console.log(data.packs[0].price)
    // console.log(data.packs[0].cards[0].card)
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

    if (loading || loadingMut) {
        return "Loading Card.";
    }
    if (error || errorMut) {
        return `Error! ${error.message}`;
    }

    const buyPack = () => {
        let packId;
        if (counter === 0) {
            packId = "61e469fc6ded4fcc8a23c1ff";
        } else if (counter === 1) {
            packId = "61e4695f6ded4fcc8a23c1fe";
        } else if (counter === 2) {
            packId = "61e457a72cf9ba8f17324f36";
        }
        buyPackMut({
            variables: {
                packId: packId,
                userId: "61e45a528161a89ca544a398",
            },
        });
    };

    return (
        <Box>
            <Header />
            <Grid
                justify="space-between"
                spacing={3}
                sx={{ mt: 20 }}
                container
                justifyContent="center"
                alignItems="center"
            >
                {bought ? (
                    <BoxerCard boxer={boughtCard} />
                ) : (
                    <Box>
                        <Dialog open={open}>
                            <DialogTitle>Confirm Purchase</DialogTitle>
                            <DialogContent>Price:{pack_price[counter]}</DialogContent>
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    buyPack();
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
                                            <Typography align="center"></Typography>
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
                        <Typography align="center" color="secondary">
                            {" "}
                            {color_name[counter]}
                        </Typography>
                    </Box>
                )}
            </Grid>
        </Box>
    );
};

export default Marketplace;
