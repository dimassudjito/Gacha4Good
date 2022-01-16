import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
const Inventory = () => {
    const data = [
        { Boxer: "Mike Tyson", Attack: 25, HP: 150 },
        { Boxer: "Jake Paul", Attack: 50, HP: 100 },
        { Boxer: "Logan Paul", Attack: 70, HP: 200 },
        { Boxer: "Manny Pacquiao", Attack: 60, HP: 130 }
    ]
    const buttons = [
        <Button size="large" color="secondary" key="one">GAME 1</Button>,
        <Button size="large" color="secondary" key="two">GAME 2</Button>,
        <Button size="large" color="secondary" key="three">GAME 4</Button>,
        <Button size="large" color="secondary" key="three">GAME 5</Button>,
        <Button size="large" color="secondary" key="three">GAME 6</Button>,
        <Button size="large" color="secondary" key="three">GAME 7</Button>,
        <Button size="large" color="secondary" key="three">GAME 8</Button>
    ];
    return (
        <Grid sx={{ m: "2rem" }} container justify="center">
            <Grid item xs={6} justify="center">
                <ButtonGroup size="large" color="secondary"
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
                    {data.map(elem => (
                        <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
                            <IconButton />
                            <Card>
                                <CardHeader
                                    title={`Boxer : ${elem.Boxer}`}
                                    subheader={`Attack : ${elem.Attack}`}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Boxer: {elem.Boxer}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        Attack: {elem.Attack}
                                    </Typography>
                                    <Typography variant="h5" gutterBottom>
                                        HP: {elem.HP}
                                    </Typography>
                                </CardContent>
                            </Card>

                        </Grid>
                    ))}

                </Grid>
            </Grid>
        </Grid>
    )
}

export default Inventory