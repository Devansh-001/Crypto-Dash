import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '@/redux/coinSlice';

export default function CustomizedSnackbars() {

    const { alert } = useSelector(store => store.coinSlice);
    const dispatch = useDispatch();


    const handleCloseSnackBar = (event, reason) => {
        dispatch(setAlert({
            msg: "",
            type: "",
            openSnackBar: false,
        }));
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={alert.openSnackBar}
            autoHideDuration={5000}
            onClose={handleCloseSnackBar}
        >
            <Alert onClose={handleCloseSnackBar} severity={alert.type} elevation={10} variant="filled" sx={{ width: "270px" }}>
                {alert.msg}
            </Alert>
        </Snackbar >
    );
}
