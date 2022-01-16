import { gql, useQuery } from "@apollo/client";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

const GET_USER = gql`
    query user($userId: String!) {
        user(id: $userId) {
            username
            balance
        }
    }
`;

const Header = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userId: "61e45a528161a89ca544a398" },
    });

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        component="img"
                        sx={{
                            height: 50,
                            width: 50,
                        }}
                        alt="coin."
                        src="/coin.png"
                    />
                    <Typography> {data ? data.user.balance : null} </Typography>
                    <Link to="/Coin">
                        <IconButton
                            size="large"
                            edge="start"
                            color="secondary"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Link>
                    <Box>
                        <Link to="/">
                            <Typography
                                align="center"
                                variant="h4"
                                component="div"
                                sx={{ flexGrow: 1, color: "secondary.main" }}
                            >
                                Gacha4Good
                            </Typography>
                        </Link>
                    </Box>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <h4> {data ? data.user.username : null} </h4>
                                <AccountCircle />
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
