import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import { useTheme } from '@/Context/ThemeContext';
import SignUp from './SignUp';
import LogIn from './LogIn';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../../firebaseConfig';
import { setAlert } from '@/redux/coinSlice';
import { useDispatch } from 'react-redux';




export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSignInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(setAlert({
                msg: `Login Successful.\n Welcome ${res.user.displayName || res.user.email}`,
                type: "success",
                openSnackBar: true
            }));
            handleClose();
        }
        catch (e) {
            dispatch(setAlert({
                msg: e.message,
                type: "error",
                openSnackBar: true,
            }));
        }
    }

    const { isDarkMode } = useTheme();


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: {
            xs: "250px",
            sm: "450px",
        },
        transform: 'translate(-50%, -50%)',
        bgcolor: `${isDarkMode ? "#1e293b" : "#80b2bb"}`,
        border: `2px solid ${isDarkMode ? "white" : "black"}`,
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 3,
    };

    return (
        <div>
            <Button onClick={handleOpen} title={"Login"} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Tabs value={value} onChange={handleChange} aria-label="login signup tabs" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Tab label="SignUp" sx={{ color: isDarkMode ? "#ffffff" : "#000000", fontWeight: value === 0 ? "800" : "100", flex: 1, fontFamily: "sans-serif" }} />
                        <Tab label="Login" sx={{ color: isDarkMode ? "#ffffff" : "#000000", fontWeight: value === 1 ? "800" : "100", flex: 1, fontFamily: "sans-serif" }} />
                    </Tabs>

                    {
                        value === 0 ? <SignUp handleClose={handleClose} /> : <LogIn handleClose={handleClose} />
                    }

                    <Box sx={{ display: 'flex', justifyContent: "center" }}>
                        <GoogleButton onClick={handleSignInWithGoogle} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}