import { Box } from "@mui/material";
import React from "react";

const BoxerHead = ({ boxer: { name, headPicture } }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box>
                <img
                    style={{
                        borderRadius: "100%",
                        border: "5px solid red",
                        width: "15em",
                        height: "15em",
                    }}
                    src={headPicture}
                    alt={name}
                />
            </Box>
        </Box>
    );
};

export default BoxerHead;
