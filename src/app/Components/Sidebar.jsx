import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import CustomizedSnackbars from './Authentication/CustomizedSnackbars';
import { setAlert } from '@/redux/coinSlice';

export default function AnchorTemporaryDrawer() {
    const [state, setState] = React.useState({
        left: false,
    });

    const { user } = useSelector(store => store.coinSlice);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const dispatch = useDispatch();

    const handleLogout = () => {
        signOut(auth);
        dispatch(setAlert({
            msg: "Sign Out Successful",
            type: "success",
            openSnackBar: true,
        }))
        toggleDrawer('left', false);
    }

    return (
        <div>
            {
                <React.Fragment >

                    <Button avatarButton onClick={toggleDrawer('left', true)} >
                        <Avatar sx={{ backgroundColor: "darkorange", border: "2px solid black" }} src={user?.image} alt={user.displayName || user.email} />
                    </Button>

                    <Drawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                    >
                        <div className='w-[160px] sm:w-[220px] md:w-[320px] p-4 flex gap-28 flex-col items-center dark:bg-dark-background bg-light-background text-light-text dark:text-dark-text h-full'>

                            <div className='flex flex-col gap-5 items-center'>

                                <Avatar
                                    src={user?.image}
                                    sx={{
                                        width: {
                                            xs: 60,
                                            sm: 80,
                                            md: 100,
                                            lg: 120
                                        },
                                        height: {
                                            xs: 60,
                                            sm: 80,
                                            md: 100,
                                            lg: 120
                                        },
                                    }}
                                    alt={user.displayName || user.email}
                                />

                                <span className=' w-full text-[14px] sm:text-[18px] text-wrap flex justify-center'>
                                    {user.displayName || user.email}
                                </span>

                            </div>

                            <div className='bg-red-300 h-full w-full flex'>
                                <span className='text-center w-full'>
                                    Watchlist
                                </span>
                            </div>

                            <Button title={"LogOut"} onClick={handleLogout} className={"w-[100px] sm:w-[150px] md:w-[200px]"} />

                        </div>
                    </Drawer>
                </React.Fragment>
            }
        </div>
    );
}
