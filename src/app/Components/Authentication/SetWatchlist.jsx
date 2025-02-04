import { setWatchlist } from '@/redux/coinSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../../../firebaseConfig';

const SetWatchlist = () => {
    const { user } = useSelector(store => store.coinSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);

            const unsubscribe = onSnapshot(coinRef, (coinSnapshot) => {
                if (coinSnapshot.exists()) {
                    const coins = coinSnapshot.data().coins;
                    dispatch(setWatchlist(coins));
                } else {
                    console.log("No items in watchlist");
                }
            });

            return () => unsubscribe();
        }
    }, [user, dispatch]);

    return (
        <div>
        </div>
    );
}

export default SetWatchlist;
