import { gql, useMutation } from "@apollo/client";
import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const CREATE_NEW_BOXER = gql`
    mutation CreateBoxer($boxerData: NewBoxingCard!) {
        createBoxer(boxerData: $boxerData) {
            _id
        }
    }
`;

export const CreateBoxer = () => {
    const [name, setName] = useState("");
    const [hp, setHp] = useState(1);
    const [attack, setAttack] = useState(1);
    const [backgroundUrl, setBgUrl] = useState("");
    const [headUrl, setHeadUrl] = useState("");

    const [submitBoxer, { data, loading, error }] = useMutation(CREATE_NEW_BOXER);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const boxerData = {
            name: name,
            healthPoints: hp,
            attackPower: attack,
            cardPicture: backgroundUrl,
            headPicture: headUrl,
        };

        console.log(boxerData);
        submitBoxer({
            variables: {
                boxerData: boxerData,
            },
        }).then(() => console.log(error));
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            <Stack spacing={2}>
                <TextField
                    id="outlined"
                    label="Boxer's Name"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <TextField
                    id="outlined"
                    type="number"
                    label="HP"
                    value={hp}
                    onChange={(evt) => setHp(parseInt(evt.target.value, 10))}
                />
                <TextField
                    id="outlined"
                    type="number"
                    label="Attack Power"
                    value={attack}
                    onChange={(evt) => setAttack(parseInt(evt.target.value, 10))}
                />
                <TextField
                    id="outlined"
                    label="Background Picture"
                    value={backgroundUrl}
                    onChange={(evt) => setBgUrl(evt.target.value)}
                />
                <TextField
                    id="outlined"
                    label="Head Picture"
                    value={headUrl}
                    onChange={(evt) => setHeadUrl(evt.target.value)}
                />
                <Button variant="outlined" onClick={handleSubmit}>
                    Add Boxer
                </Button>
            </Stack>
        </Box>
    );
};
