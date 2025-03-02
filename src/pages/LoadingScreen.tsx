import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LoadingScreenProps {
    text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text = "Đang tải dữ liệu..." }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#f8f9fa",
            }}
        >
            <CircularProgress size={50} color="primary" />
            <Typography variant="h6" sx={{ mt: 2, color: "#333" }}>
                {text}
            </Typography>
        </Box>
    );
};

export default LoadingScreen;
