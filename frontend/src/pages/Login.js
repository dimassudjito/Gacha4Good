import React from "react";

import { TextField, Grid, Card, Typography, Box, Button } from "@mui/material";

const Login = () => {
    return (
        <Box>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Card>
                    <Typography align="center" variant="h4">
                        Login
                    </Typography>
                    <Box>
                        <TextField label="Username" variant="outlined" />
                    </Box>
                    <Box>
                        <TextField type="password" label="Password" variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined">Login</Button>
                    </Box>
                </Card>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                <Card>
                    <Typography align="center" variant="h4">
                        Register
                    </Typography>
                    <Box>
                        <TextField label="Username" variant="outlined" />
                    </Box>
                    <Box>
                        <TextField type="password" label="Password" variant="outlined" />
                    </Box>
                    <Box>
                        <TextField type="password" label="Confirm Password" variant="outlined" />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="outlined">Register</Button>
                    </Box>
                </Card>
            </Grid>
        </Box>
    );
};

export default Login;
