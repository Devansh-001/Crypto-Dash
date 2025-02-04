import Image from 'next/image'
import React, { useEffect } from 'react'
import ReactHtmlParser from "html-react-parser"
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import { setAlert } from '@/redux/coinSlice'

const CoinSideBar = ({ coin, currency }) => {

    const { user, watchlist } = useSelector(store => store.coinSlice)
    const dispatch = useDispatch();

    const addToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.uid);

        try {

            await setDoc(coinRef, {
                coins: [...watchlist, coin.id]
            });

            dispatch(setAlert({
                msg: `${coin.name} Added to the watchlist!`,
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

    const removeFromWatchlist = async () => {
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

    const isInWatchlist = watchlist?.includes(coin?.id);

    return (
        <div className='flex flex-col gap-6 sm:w-[30%] w-full p-4 sm:border-r-2 dark:border-white border-black'>

            <div className='flex flex-col items-center gap-5'>
                <Image src={coin?.image.large} width={120} height={120} alt='coin' />
                <h3 className='text-5xl font-bold'>{coin?.name}</h3>
                <h3 className='text-[20px] sm:text-[15px] '>{ReactHtmlParser(coin?.description?.en?.split(".")[0]) + "...."}.</h3>
            </div>

            <div className='flex flex-col justify-between sm:text-[14px] md:text-[18px] gap-5'>

                <span>Rank: {coin?.market_cap_rank}</span>
                <span>Price: {currency.symbol}{coin?.market_data?.current_price?.[currency.name]}</span>
                <span>Market Cap:

                    {currency.symbol}
                    {coin?.market_data?.market_cap?.[currency.name]?.toLocaleString()}

                </span>

                {
                    user &&
                    <Button className={'w-full'} onClick={isInWatchlist ? removeFromWatchlist : addToWatchlist}>
                        {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
                    </Button>
                }
            </div>

        </div>
    )
}

export default CoinSideBar
