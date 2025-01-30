import { Box, TextField } from '@mui/material';
import React, { useState } from 'react'

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    return (
        <Box>
            <TextField
                type='email'
                label="Enter Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                type='password'
                label="Enter Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                type='password'
                label="Confirm Password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </Box>
    )
}

export default SignUp
