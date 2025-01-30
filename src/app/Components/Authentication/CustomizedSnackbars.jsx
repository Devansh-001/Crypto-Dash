import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({ open, handleClose, alert }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={alert.type} elevation={10} variant="filled" sx={{ width: "270px" }}>
                {alert.msg}
            </Alert>
        </Snackbar >
    );
}
