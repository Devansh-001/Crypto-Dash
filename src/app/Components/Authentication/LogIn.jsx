import { useTheme } from '@/Context/ThemeContext';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isDarkMode } = useTheme();

    const styles = {
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: isDarkMode ? "#1e293b" : "#f7f7f7",
        borderRadius: 3,
        boxShadow: isDarkMode ? "0px 4px 10px rgba(255, 255, 255, 0.1)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
        color: isDarkMode ? "#b0b0b0" : "#333333",
        alignItems: "center"
    };

    const textFieldStyles = {
        marginBottom: 2,
        backgroundColor: isDarkMode ? "#2d3a47" : "#ffffff",
        borderRadius: 2,
        '& .MuiInputBase-root': {
            color: isDarkMode ? '#b0b0b0' : '#333333',
        },
        '& .MuiInputLabel-root': {
            color: isDarkMode ? '#b0b0b0' : '#333333',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: isDarkMode ? '#b0b0b0' : '#ccc',
            },
            '&:hover fieldset': {
                borderColor: isDarkMode ? '#b0b0b0' : '#aaa',
            },
        },
    };

    const handleSubmit = async () => {
        
    }

    return (
        <Box sx={styles}>
            <TextField
                type="email"
                label="Enter Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={textFieldStyles}
            />
            <TextField
                type="password"
                label="Enter Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldStyles}
            />

            <Button title={"Login"} onSubmit={handleSubmit} />
        </Box>
    );
}

export default Login;
