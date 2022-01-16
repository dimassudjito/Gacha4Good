import { gql, useQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import React from "react";
import BoxerCard from "../components/boxerKing/BoxerCard";
import Header from "../components/Header";

const GET_INVENTORY = gql`
    query Inventory($userId: String!) {
        user(id: $userId) {
            inventory {
                _id
                name
                healthPoints
                attackPower
                cardPicture
                headPicture
            }
        }
    }
`;

const Inventory = () => {
    const { loading, error, data } = useQuery(GET_INVENTORY, {
        variables: {
            userId: "61e45a528161a89ca544a398",
        },
    });
    const buttons = [
        <Button size="large" color="secondary">
            GAME 1
        </Button>,
        <Button size="large" color="secondary">
            GAME 2
        </Button>,
        <Button size="large" color="secondary">
            GAME 3
        </Button>,
        <Button size="large" color="secondary">
            GAME 4
        </Button>,
        <Button size="large" color="secondary">
            GAME 5
        </Button>,
        <Button size="large" color="secondary">
            GAME 6
        </Button>,
        <Button size="large" color="secondary">
            GAME 7
        </Button>,
        <Button size="large" color="secondary">
            GAME 8
        </Button>,
    ];

    if (loading) {
        return "Loading...";
    }
    if (error) {
        return `Error! ${error.message}`;
    }

    return (
        <Box>
            <Header />
            <Grid sx={{ m: "2rem" }} container justify="center">
                <Grid item xs={6} justify="center">
                    <ButtonGroup
                        size="large"
                        color="secondary"
                        orientation="vertical"
                        aria-label="vertical outlined button group"
                        style={{ backgroundColor: "0x000000" }}
                    >
                        {buttons}
                    </ButtonGroup>
                </Grid>
                <Grid sx={{ pr: "3rem" }} item xs={6}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-flow"
                        alignItems="flex-flow"
                    >
                        {data.user.inventory.map((elem) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={3}
                                key={data.user.inventory.indexOf(elem)}
                            >
                                <BoxerCard boxer={elem} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Inventory;
