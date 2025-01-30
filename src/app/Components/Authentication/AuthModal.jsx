import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '../Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import { useTheme } from '@/Context/ThemeContext';
import SignUp from './SignUp';
import LogIn from './LogIn';




export default function AuthModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const { isDarkMode } = useTheme();


    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: {
            xs: "250px",
            sm: "450px",
        },
        transform: 'translate(-50%, -50%)',
        bgcolor: `${isDarkMode ? "#1e293b" : "#cae3fa"}`,
        border: `2px solid ${isDarkMode ? "white" : "black"}`,
        borderRadius: 3,
        boxShadow: 24,
        p: 2,
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
                </Box>
            </Modal>
        </div>
    );
}