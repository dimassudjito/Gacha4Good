import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import React from "react";
import BoxerCard from "../components/boxerKing/BoxerCard";
import Header from "../components/Header";

const Inventory = () => {
    const dummyBoxerData = [
        {
            name: "Mike Tyson",
            hp: 100,
            power: 25,
            img: "https://cdn.vox-cdn.com/thumbor/LtQtXYaj-suLI0jKUBLE-Fx2O9s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22127884/1288364271.jpg",
            head_img:
                "https://boxrec.com/media/images//thumb/9/94/MikeTysonHeadshot2.jpg/250px-MikeTysonHeadshot2.jpg",
        },
        {
            name: "Manny Pacquiao",
            hp: 95,
            power: 20,
            img: "https://www.biography.com/.image/t_share/MTg0ODYyNTg1Njg0ODI5MzA0/gettyimages-1163293092.jpg",
            head_img: "https://www.famousbirthdays.com/headshots/manny-pacquiao-3.jpg",
        },
    ];

    for (let i = 0; i < 30; i = i + 1) {
        dummyBoxerData.push({
            name: "Mike Tyson",
            hp: 100,
            power: 25,
            img: "https://cdn.vox-cdn.com/thumbor/LtQtXYaj-suLI0jKUBLE-Fx2O9s=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22127884/1288364271.jpg",
            head_img:
                "https://boxrec.com/media/images//thumb/9/94/MikeTysonHeadshot2.jpg/250px-MikeTysonHeadshot2.jpg",
        });
    }
    const buttons = [
        <Button size="large" color="secondary" key="one">
            GAME 1
        </Button>,
        <Button size="large" color="secondary" key="two">
            GAME 2
        </Button>,
        <Button size="large" color="secondary" key="three">
            GAME 4
        </Button>,
        <Button size="large" color="secondary" key="three">
            GAME 5
        </Button>,
        <Button size="large" color="secondary" key="three">
            GAME 6
        </Button>,
        <Button size="large" color="secondary" key="three">
            GAME 7
        </Button>,
        <Button size="large" color="secondary" key="three">
            GAME 8
        </Button>,
    ];
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
                        {dummyBoxerData.map((elem) => (
                            <Grid item xs={12} sm={6} md={3} key={dummyBoxerData.indexOf(elem)}>
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
