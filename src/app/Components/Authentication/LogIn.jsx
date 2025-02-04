import { useTheme } from '@/Context/ThemeContext';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import CustomizedSnackbars from './CustomizedSnackbars';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/coinSlice';

const Login = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { isDarkMode } = useTheme();

    const dispatch = useDispatch();

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

        console.log("button")
        if (!email || !password) {
            dispatch(setAlert({
                msg: "Please fill all the fields.",
                type: "error",
                openSnackBar: true
            }))
            return;
        }

        setIsLoading(true);

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            dispatch(setAlert({
                msg: `Login Successful.\n Welcome ${res.user.displayName || res.user.email}`,
                type: "success",
                openSnackBar: true
            }));

            handleClose();

        }
        catch (e) {
            let errorMessage = e.message;

            if (errorMessage.includes("auth/invalid-email")) {
                errorMessage = "The email address is invalid.";
            } else if (errorMessage.includes("auth/invalid-credential")) {
                errorMessage = "Either email address or password is invalid.";
            } else if (errorMessage.includes("auth/wrong-password")) {
                errorMessage = "Incorrect password.";
            }

            setAlert({
                msg: errorMessage,
                type: "error",
                openSnackBar: true,
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    const isButtonDisabled = !email || !password || isLoading;

    return (
        <Box sx={styles}>
            <TextField
                type="email"
                label="Enter Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={textFieldStyles}
                name='email'
                required
            />
            <TextField
                type="password"
                label="Enter Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldStyles}
                name='password'
                required
            />

            <Button title={"Login"} onClick={handleSubmit} disabled={isButtonDisabled} isLoading={isLoading} />

        </Box>
    );
}

export default Login;
