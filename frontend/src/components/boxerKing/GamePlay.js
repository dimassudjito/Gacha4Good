import { Box, Button, ButtonGroup, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoxerCard from "./BoxerCard";
import BoxerHead from "./BoxerHead";

const GamePlay = ({ boxers, boxer }) => {
    // general card data
    const [p1] = useState(boxer);
    const [p2] = useState(boxers[Math.floor(Math.random() * boxers.length)]);
    // gameplay data
    const [p1Move, setP1Move] = useState(null);
    const [p2Move, setP2Move] = useState(null);
    const [p1Hp, setP1Hp] = useState(p1.healthPoints);
    const [p2Hp, setP2Hp] = useState(p2.healthPoints);
    const [winner, setWinner] = useState(null);

    const makeMove = (move1) => {
        let move2 = createBoxMove();
        let winner = evaluateMove(move1, move2);
        // update state
        setP1Move(move1);
        setP2Move(move2);
        modifyHp(winner);
    };

    const createBoxMove = () => {
        let choice = ["rock", "paper", "scissor"];
        let i = Math.floor(Math.random() * 3);
        return choice[i];
    };

    const evaluateMove = (move1, move2) => {
        if (move1 === "rock") {
            switch (move2) {
                case "rock":
                    return "draw";
                case "paper":
                    return "p2";
                case "scissor":
                    return "p1";
                default:
                    return "draw";
            }
        } else if (move1 === "paper") {
            switch (move2) {
                case "rock":
                    return "p1";
                case "paper":
                    return "draw";
                case "scissor":
                    return "p2";
                default:
                    return "draw";
            }
        } else if (move1 === "scissor") {
            switch (move2) {
                case "rock":
                    return "p2";
                case "paper":
                    return "p1";
                case "scissor":
                    return "draw";
                default:
                    return "draw";
            }
        }
    };

    const modifyHp = (winner) => {
        if (winner === "p1") {
            setP2Hp(p2Hp - p1.power);
        } else if (winner === "p2") {
            setP1Hp(p1Hp - p2.power);
        }
    };

    useEffect(() => {
        if (p1Hp <= 0) {
            setWinner("Player 2");
        } else if (p2Hp <= 0) {
            setWinner("Player 1");
        }
    }, [p1Hp, p2Hp]);

    return (
        <Box>
            <Grid container columnSpacing={1}>
                <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Player 1 (Human)</Typography>
                        <Typography>HP: {p1Hp}</Typography>
                        <hr />
                        <BoxerHead boxer={p1} />
                        {p1Move ? (
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="outlined">{p1Move}</Button>
                            </Box>
                        ) : null}
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 2 }}>
                        <Typography>Player 2 (Bot)</Typography>
                        <Typography>HP: {p2Hp}</Typography>
                        <hr />
                        <BoxerHead boxer={p2} move={p2Move} />
                        {p2Move ? (
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button variant="outlined">{p2Move}</Button>
                            </Box>
                        ) : null}
                    </Card>
                </Grid>
            </Grid>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs={4}>
                    <BoxerCard boxer={p1} />
                </Grid>
                <Grid item xs={4}>
                    {winner ? (
                        <Typography variant="h4" color="secondary">
                            {winner} wins!
                        </Typography>
                    ) : (
                        <ButtonGroup>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    makeMove("rock");
                                }}
                            >
                                Rock
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    makeMove("paper");
                                }}
                            >
                                Paper
                            </Button>
                            <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => {
                                    makeMove("scissor");
                                }}
                            >
                                Scissor
                            </Button>
                        </ButtonGroup>
                    )}
                </Grid>
                <Grid item xs={4}>
                    <BoxerCard boxer={p2} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default GamePlay;
