import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import CustomizedSnackbars from './Authentication/CustomizedSnackbars';
import { setAlert } from '@/redux/coinSlice';
import { MdDelete } from 'react-icons/md';
import { doc, setDoc } from 'firebase/firestore';

export default function AnchorTemporaryDrawer() {
    const [state, setState] = React.useState({
        left: false,
    });

    const { user, allCoins, watchlist, currency } = useSelector(store => store.coinSlice);

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


    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);

        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((listCoin) => listCoin !== coin.id) },
                { merge: true },
            );

            dispatch(setAlert({
                msg: `${coin.name} Removed from the watchlist!`,
                type: "success",
                openSnackBar: true
            }));
        }
        catch (e) {
            dispatch(setAlert({
                msg: e.message,
                type: "error",
                openSnackBar: true
            }))
        }
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
                        <div className='w-[240px] sm:w-[250px] md:w-[320px] lg:w-[380px] p-4 flex gap-10 flex-col items-center dark:bg-dark-background bg-light-background text-light-text dark:text-dark-text h-full'>

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

                            <div className='dark:bg-slate-400 bg-slate-700 text-white dark:text-black p-2 rounded-lg h-full w-full gap-3 text-[16px] sm:text-[17px] md:text-[20px] lg:text-[25px] flex flex-col'>
                                <div className='font-extrabold text-center text-[20px] sm:text-[24px] md:text-[27px]'>
                                    Watchlist
                                </div>
                                <div className='w-full border-2' />
                                <ul className='flex flex-col gap-3 sm:p-1 md:p-4 lg:p-6'>
                                    {

                                        allCoins?.map((coin, index) => {
                                            if (watchlist?.includes(coin?.id)) {
                                                return (
                                                    <li key={index} className='flex gap-1 items-center'>
                                                        <span className='font-semibold' >{coin?.name}:</span>
                                                        <span>{currency?.symbol}{coin?.current_price.toLocaleString()}
                                                        </span>
                                                        <MdDelete size={21} className='cursor-pointer' onClick={() => removeFromWatchlist(coin)} />
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>
                            </div>

                            <Button title={"LogOut"} onClick={handleLogout} className={"w-[100px] sm:w-[150px] md:w-[200px]"} />

                        </div>
                    </Drawer>
                </React.Fragment>
            }
        </div>
    );
}
