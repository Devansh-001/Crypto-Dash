import { useTheme } from '@/Context/ThemeContext';
import { Box, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/redux/coinSlice';

const SignUp = ({ handleClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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
        alignItems: "center",
    };

    const textFieldStyles = {
        marginBottom: 2,
        backgroundColor: isDarkMode ? "#2d3a47" : "#f7f7f7",
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
        if (password !== confirmPassword) {
            dispatch(setAlert({
                msg: "Passwords do not match!",
                type: "error",
                openSnackBar: true
            }));
            return
        }
        setIsLoading(true);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            dispatch(setAlert({
                msg: `Sign Up Successful.\n Welcome ${res.user.displayName || res.user.email}`,
                type: "success",
                openSnackBar: true
            }));

            handleClose();

        }
        catch (e) {
            dispatch(setAlert({
                msg: e.message,
                type: "error",
                openSnackBar: true
            }))
        }
        finally {
            setIsLoading(false);
        }
    }

    const isButtonDisabled = !email || !password || isLoading;

    return (
        <>
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
                <TextField
                    type="password"
                    label="Confirm Password"
                    fullWidth
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={textFieldStyles}
                    name='confirm password'
                    required
                />
                <Button title={"SignUp"} isLoading={isLoading} onClick={handleSubmit} disabled={isButtonDisabled} />

            </Box>
        </>
    );
}

export default SignUp;
