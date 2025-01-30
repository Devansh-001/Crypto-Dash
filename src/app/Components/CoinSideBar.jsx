import Image from 'next/image'
import React from 'react'
import ReactHtmlParser from "html-react-parser"

const CoinSideBar = ({ coin, currency }) => {

    return (
        <div className='flex flex-col gap-5 sm:w-[30%] w-full p-4 sm:border-r-2 dark:border-white border-black'>
            <div className='flex flex-col items-center gap-5'>
                <Image src={coin?.image.large} width={120} height={120} alt='coin' />
                <h3 className='text-5xl font-bold'>{coin?.name}</h3>
                <h3 className='text-[20px] sm:text-[15px] '>{ReactHtmlParser(coin?.description?.en?.split(".").slice(0, 2).join("."))}.</h3>
            </div>
            <div className='flex flex-wrap sm:flex-col justify-between text-[18px] gap-2'>

                <span>Rank: {coin?.market_cap_rank}</span>
                <span>Price: {currency.symbol}{coin?.market_data?.current_price?.[currency.name]}</span>
                <span>Market Cap:
                    {currency.symbol}{coin?.market_data?.market_cap?.[currency.name]?.toLocaleString()}
                </span>
            </div>
        </div>
    )
}

export default CoinSideBar
