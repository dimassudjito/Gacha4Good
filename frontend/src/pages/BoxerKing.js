import React, { useState } from "react";

import { Container, Box } from "@mui/material";

import ChooseBoxer from "../components/boxerKing/ChooseBoxer";
import GamePlay from "../components/boxerKing/GamePlay";

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
    {
        name: "Muhammad Ali",
        hp: 110,
        power: 20,
        img: "https://cdn.vox-cdn.com/thumbor/gSlcQpXEJLH_vkBSovzAYrxhJwA=/77x0:1322x934/1400x1400/filters:focal(77x0:1322x934):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/55911717/1_J85jI_HahBSm4U8FSvCd3A.0.jpeg",
        head_img: "https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_NYWTS.jpg",
    },
    {
        name: "Logan Paul",
        hp: 60,
        power: 10,
        img: "https://akns-images.eonline.com/eol_images/Entire_Site/202154/rs_634x1024-210604143907-634.logan-paul-boxing.ct.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top",
        head_img:
            "https://yt3.ggpht.com/ytc/AKedOLRzOwb2y7du3TOWgYqGU9rocPuvfgxkdDKH5pzrcg=s900-c-k-c0x00ffffff-no-rj",
    },
];

const BoxerKing = () => {
    const [boxers] = useState(dummyBoxerData);
    const [boxer, setBoxer] = useState(null);

    const chooseBoxer = (boxer) => {
        setBoxer(boxer);
    };

    return (
        <Box>
            <Container maxWidth="md">
                {boxer ? (
                    <GamePlay boxers={boxers} boxer={boxer} />
                ) : (
                    <ChooseBoxer boxers={boxers} chooseBoxer={chooseBoxer} />
                )}
            </Container>
        </Box>
    );
};

export default BoxerKing;
