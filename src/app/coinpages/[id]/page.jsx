"use client";

import CoinChart from "@/app/Components/CoinChart";
import CoinSideBar from "@/app/Components/CoinSideBar";
import { CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CoinPage = () => {

    const params = useParams();
    const { id } = params;
    const [coin, setCoin] = useState();

    const { currency } = useSelector(store => store.coinSlice)

    const fetchCoin = async () => {

        // const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoin(data)
    }


    useEffect(() => {
        fetchCoin();
    }, [id])


    if (!coin) {
        return <div className="flex w-full h-screen overflow-y-hidden bg-light-background justify-center items-center dark:bg-dark-background"><CircularProgress size={200} color='warning' /></div>
    }


    return (
        <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text flex flex-col sm:flex-row items-center p-3">
            <CoinSideBar coin={coin} currency={currency} />
            <CoinChart coin={coin} currency={currency} />
        </div>
    )
}

export default CoinPage
