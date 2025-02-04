"use client";

import { setAllCoins, setPage } from '@/redux/coinSlice';
import { CircularProgress, Pagination } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';




const CryptoTable = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [displayCoins, setDisplayCoins] = useState([]);
    const { page } = useSelector(store => store.coinSlice)

    const { allCoins, currency, searchInput } = useSelector(store => store.coinSlice);

    const dispatch = useDispatch();

    const tableRef = useRef(null);


    useEffect(() => {
        const fetchAllCoins = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency?.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
                const data = await res.json();
                dispatch(setAllCoins(data));
                setDisplayCoins(data.slice((page - 1) * 10, (page - 1) * 10 + 10));
            } catch (error) {
                console.error("Error fetching coins:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllCoins();
    }, [currency, page]);


    useEffect(() => {
        const coins = allCoins.filter((coin) => {
            return (
                coin?.name?.toLowerCase()?.includes(searchInput.toLowerCase())
            )
        })
        setDisplayCoins(coins);
    }, [searchInput])


    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 490); // Tailwind's sm breakpoint (640px)
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);



    return (


        <section className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text flex justify-center p-6" ref={tableRef}>

            {isLoading ? <CircularProgress /> :

                <div className="bg-blue-100 shadow-lg shadow-slate-600 dark:shadow-slate-600 dark:bg-[#1e293b] border border-[#312c2ca8] dark:border-[#ffffff99] rounded-2xl p-2">
                    <table className="w-fit">
                        <thead className='rounded-xl'>
                            <tr className="border-b-2 border-black">
                                <th className="font-bold py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">Rank</th>
                                <th className="font-bold py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">Coin</th>
                                <th className="font-bold py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">Current Price</th>
                                <th className="font-bold py-2 border-0 sml:border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">24H Change</th>
                                <th className="font-bold py-2 hidden sml:block border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayCoins.map((coin, index) => (


                                <tr key={coin?.market_cap_rank}
                                    className={`border-black ${index + 1 == displayCoins.length ? "border-none" : "border-b"}`}
                                >
                                    <td className="py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">
                                        {coin?.market_cap_rank.toLocaleString()}
                                    </td>
                                    <td >
                                        <Link href={`/coinpages/${coin?.id}`}
                                            className="flex flex-wrap xsm:flex-nowrap flex-col xsm:flex-row gap-2 py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl truncate"
                                        >
                                            <Image src={coin?.image} alt="coin" width={20} height={20} />
                                            {isSmallScreen ? `${coin?.name.slice(0, 6)}...` : coin?.name}
                                        </Link>
                                    </td>
                                    <td className="py-2 border-r border-black px-2 sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">
                                        {currency?.symbol}{coin?.current_price.toLocaleString()}
                                    </td>
                                    <td className={`py-2 px-2 sml:border-r border-black sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl font-bold ${coin?.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        {Math.floor(coin?.price_change_percentage_24h * 100) / 100}%
                                    </td>
                                    <td className="py-2 px-2 hidden sml:block border-black sm:px-3 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-xl">
                                        {currency?.symbol}{coin?.market_cap?.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        className='flex justify-center dark:bg-dark-background items-center'
                        size={`${isSmallScreen ? "small" : "medium"}`}
                        count={Math.ceil(allCoins?.length / 10)}
                        onChange={(_, pageNum) => {
                            dispatch(setPage(pageNum))
                            console.log(page)
                            tableRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        page={page}
                        sx={{
                            '.MuiPaginationItem-root': {
                                color: 'inherit', // Ensures the text color is correct in both dark and light mode
                            },
                            '.MuiPaginationItem-root.Mui-selected': {
                                backgroundColor: '#90bcd9', // Selected item background
                            },
                            '.MuiPaginationItem-root:hover': {
                                backgroundColor: '#334155', // Hover effect for dark mode
                            },
                            '.MuiPaginationItem-text': {
                                color: 'inherit', // Ensures text color is correct on hover and selection
                            },

                        }}
                    />
                </div>
            }
        </section >

    )
}

export default CryptoTable
