import { gql, useMutation } from "@apollo/client";
import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const CREATE_NEW_USER = gql`
    mutation NewUser($newUserData: NewUserInput!) {
        newUser(newUserData: $newUserData) {
            token
            user {
                _id
                username
                balance
            }
        }
    }
`;

const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        login(password: $password, username: $username) {
            token
            user {
                _id
                username
                balance
                inventory {
                    card {
                        _id
                        name
                        attackPower
                        healthPoints
                        cardPicture
                        headPicture
                    }
                    count
                }
            }
        }
    }
`;

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

const Login = () => {
    const [usernameField, setUsernameField] = useState("");
    const [passwordField, setPassword] = useState("");

    const [createUsernameField, setCreateUsernameField] = useState("");
    const [createPasswordField, setCreatePassword] = useState("");
    const [passwordConfirmField, setPasswordConfirm] = useState("");

    const [createUser, { data, loading, error }] = useMutation(CREATE_NEW_USER);

    const loginButton = (evt) => {
        evt.preventDefault();
    };

    const registerButton = async (evt) => {
        evt.preventDefault();

        if (createPasswordField !== passwordConfirmField) {
            alert("Password did not match");
            return;
        }

        const newUserData = {
            username: createUsernameField,
            password: await sha256(createPasswordField),
        };

        createUser({
            variables: { newUserData: newUserData },
        }).then((ex) => {
            console.log(ex);
            console.log(data);
        });
    };

    return (
        <Box>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Card>
                    <Typography align="center" variant="h4">
                        Login
                    </Typography>
                    <Box component="form" noValidate autoComplete="off">
                        <Box>
                            <TextField
                                label="Username"
                                variant="outlined"
                                onChange={(e) => {
                                    setUsernameField(e.target.value);
                                }}
                                value={usernameField}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={passwordField}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="outlined" onClick={loginButton}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Card>
                    <Box component="form" noValidate autoComplete="off">
                        <Typography align="center" variant="h4">
                            Register
                        </Typography>
                        <Box>
                            <TextField
                                label="Username"
                                variant="outlined"
                                onChange={(e) => {
                                    setCreateUsernameField(e.target.value);
                                }}
                                value={createUsernameField}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="password"
                                label="Password"
                                variant="outlined"
                                onChange={(e) => {
                                    setCreatePassword(e.target.value);
                                }}
                                value={createPasswordField}
                            />
                        </Box>
                        <Box>
                            <TextField
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value);
                                }}
                                value={passwordConfirmField}
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="outlined" onClick={registerButton}>
                                Register
                            </Button>
                        </Box>{" "}
                    </Box>
                </Card>
            </Grid>
        </Box>
    );
};

export default Login;
