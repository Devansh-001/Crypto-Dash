"use client"
import { IoIosSearch } from "react-icons/io"
import Button from "./Button"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSearchInput } from "@/redux/coinSlice"

const HeroSection = () => {

    const { allCoins } = useSelector(store => store.coinSlice)
    const coinArray =
        [
            {
                "id": "bitcoin",
                "symbol": "btc",
                "name": "Bitcoin",
                "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
                "current_price": 8996166,
                "market_cap": 178037032144568,
                "market_cap_rank": 1,
                "fully_diluted_valuation": 178037095050748,
                "total_volume": 5577034916807,
                "high_24h": 9024448,
                "low_24h": 8562114,
                "price_change_24h": 434052,
                "price_change_percentage_24h": 5.06944,
                "market_cap_change_24h": 8597472081290,
                "market_cap_change_percentage_24h": 5.07406,
                "circulating_supply": 19811396,
                "total_supply": 19811403,
                "max_supply": 21000000,
                "ath": 9181700,
                "ath_change_percentage": -1.93321,
                "ath_date": "2024-12-17T15:02:41.429Z",
                "atl": 3993.42,
                "atl_change_percentage": 225375.91219,
                "atl_date": "2013-07-05T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:53:03.519Z"
            },
            {
                "id": "ethereum",
                "symbol": "eth",
                "name": "Ethereum",
                "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
                "current_price": 295874,
                "market_cap": 35626603713653,
                "market_cap_rank": 2,
                "fully_diluted_valuation": 35626603713653,
                "total_volume": 2217306824680,
                "high_24h": 299104,
                "low_24h": 283971,
                "price_change_24h": 8087.61,
                "price_change_percentage_24h": 2.81029,
                "market_cap_change_24h": 984336235746,
                "market_cap_change_percentage_24h": 2.84143,
                "circulating_supply": 120500593.1914485,
                "total_supply": 120500593.1914485,
                "max_supply": null,
                "ath": 362338,
                "ath_change_percentage": -18.1949,
                "ath_date": "2021-11-10T14:24:19.604Z",
                "atl": 28.13,
                "atl_change_percentage": 1053573.11852,
                "atl_date": "2015-10-20T00:00:00.000Z",
                "roi": {
                    "times": 42.96523977189906,
                    "currency": "btc",
                    "percentage": 4296.523977189906
                },
                "last_updated": "2025-01-17T15:52:53.684Z"
            },
            {
                "id": "ripple",
                "symbol": "xrp",
                "name": "XRP",
                "image": "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
                "current_price": 278.48,
                "market_cap": 16033549935660,
                "market_cap_rank": 3,
                "fully_diluted_valuation": 27849496898544,
                "total_volume": 1437734478541,
                "high_24h": 293.09,
                "low_24h": 276.5,
                "price_change_24h": -8.42196959773213,
                "price_change_percentage_24h": -2.93544,
                "market_cap_change_24h": -399975859088.47266,
                "market_cap_change_percentage_24h": -2.4339,
                "circulating_supply": 57564441898,
                "total_supply": 99986637553,
                "max_supply": 100000000000,
                "ath": 293.09,
                "ath_change_percentage": -5.21043,
                "ath_date": "2025-01-16T16:55:12.134Z",
                "atl": 0.159343,
                "atl_change_percentage": 174251.99997,
                "atl_date": "2013-08-16T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:52:53.677Z"
            },
            {
                "id": "tether",
                "symbol": "usdt",
                "name": "Tether",
                "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
                "current_price": 86.65,
                "market_cap": 11901696736899,
                "market_cap_rank": 4,
                "fully_diluted_valuation": 11901696736899,
                "total_volume": 6772406463334,
                "high_24h": 86.89,
                "low_24h": 86.34,
                "price_change_24h": -0.08547374835940502,
                "price_change_percentage_24h": -0.09854,
                "market_cap_change_24h": -31583291997.78125,
                "market_cap_change_percentage_24h": -0.26467,
                "circulating_supply": 137460714171.4841,
                "total_supply": 137460714171.4841,
                "max_supply": null,
                "ath": 91.22,
                "ath_change_percentage": -4.98775,
                "ath_date": "2018-07-24T00:00:00.000Z",
                "atl": 36.86,
                "atl_change_percentage": 135.13927,
                "atl_date": "2015-03-02T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:53:04.468Z"
            },
            {
                "id": "solana",
                "symbol": "sol",
                "name": "Solana",
                "image": "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
                "current_price": 18851.4,
                "market_cap": 9170620992651,
                "market_cap_rank": 5,
                "fully_diluted_valuation": 11164707283027,
                "total_volume": 527062561818,
                "high_24h": 19203.91,
                "low_24h": 18077.18,
                "price_change_24h": 774.22,
                "price_change_percentage_24h": 4.28288,
                "market_cap_change_24h": 412184933040,
                "market_cap_change_percentage_24h": 4.70615,
                "circulating_supply": 486600454.7076244,
                "total_supply": 592408261.6599289,
                "max_supply": null,
                "ath": 22225,
                "ath_change_percentage": -15.03727,
                "ath_date": "2024-11-23T15:05:59.896Z",
                "atl": 38.03,
                "atl_change_percentage": 49557.90738,
                "atl_date": "2020-05-11T19:35:23.449Z",
                "roi": null,
                "last_updated": "2025-01-17T15:52:53.420Z"
            },
            {
                "id": "binancecoin",
                "symbol": "bnb",
                "name": "BNB",
                "image": "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
                "current_price": 62450,
                "market_cap": 9108201508885,
                "market_cap_rank": 6,
                "fully_diluted_valuation": 9108201508885,
                "total_volume": 82490044044,
                "high_24h": 63021,
                "low_24h": 61288,
                "price_change_24h": 1039.23,
                "price_change_percentage_24h": 1.69226,
                "market_cap_change_24h": 153625977511,
                "market_cap_change_percentage_24h": 1.71561,
                "circulating_supply": 145887575.79,
                "total_supply": 145887575.79,
                "max_supply": 200000000,
                "ath": 66850,
                "ath_change_percentage": -6.50591,
                "ath_date": "2024-12-04T10:35:25.220Z",
                "atl": 2.58,
                "atl_change_percentage": 2417991.92918,
                "atl_date": "2017-10-19T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:53:05.084Z"
            },
            {
                "id": "dogecoin",
                "symbol": "doge",
                "name": "Dogecoin",
                "image": "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
                "current_price": 35.89,
                "market_cap": 5293582262168,
                "market_cap_rank": 7,
                "fully_diluted_valuation": 5293844333108,
                "total_volume": 540022666705,
                "high_24h": 36.2,
                "low_24h": 32.55,
                "price_change_24h": 2.96,
                "price_change_percentage_24h": 8.98845,
                "market_cap_change_24h": 435964405358,
                "market_cap_change_percentage_24h": 8.97486,
                "circulating_supply": 147655006383.7052,
                "total_supply": 147662316383.7052,
                "max_supply": null,
                "ath": 53.62,
                "ath_change_percentage": -33.37244,
                "ath_date": "2021-05-08T05:08:23.458Z",
                "atl": 0.00552883,
                "atl_change_percentage": 646043.18111,
                "atl_date": "2015-05-06T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:52:56.779Z"
            },
            {
                "id": "usd-coin",
                "symbol": "usdc",
                "name": "USDC",
                "image": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
                "current_price": 86.63,
                "market_cap": 4018212627511,
                "market_cap_rank": 8,
                "fully_diluted_valuation": 4027684919459,
                "total_volume": 1014266663799,
                "high_24h": 86.89,
                "low_24h": 86.26,
                "price_change_24h": -0.163749057727955,
                "price_change_percentage_24h": -0.18866,
                "market_cap_change_24h": 13287127512,
                "market_cap_change_percentage_24h": 0.33177,
                "circulating_supply": 46472495126.73265,
                "total_supply": 46582046582.11096,
                "max_supply": null,
                "ath": 87.27,
                "ath_change_percentage": -0.76028,
                "ath_date": "2025-01-13T15:10:18.980Z",
                "atl": 65.31,
                "atl_change_percentage": 32.60773,
                "atl_date": "2021-05-19T13:14:05.611Z",
                "roi": null,
                "last_updated": "2025-01-17T15:53:04.626Z"
            },
            {
                "id": "cardano",
                "symbol": "ada",
                "name": "Cardano",
                "image": "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
                "current_price": 96.11,
                "market_cap": 3446846781260,
                "market_cap_rank": 9,
                "fully_diluted_valuation": 4324109354437,
                "total_volume": 154740066465,
                "high_24h": 98.86,
                "low_24h": 93.83,
                "price_change_24h": 1.22,
                "price_change_percentage_24h": 1.2865,
                "market_cap_change_24h": 51250119330,
                "market_cap_change_percentage_24h": 1.50931,
                "circulating_supply": 35870532505.74256,
                "total_supply": 45000000000,
                "max_supply": 45000000000,
                "ath": 225.26,
                "ath_change_percentage": -57.33415,
                "ath_date": "2021-09-02T06:00:10.474Z",
                "atl": 1.38,
                "atl_change_percentage": 6887.7056,
                "atl_date": "2017-11-02T00:00:00.000Z",
                "roi": null,
                "last_updated": "2025-01-17T15:52:52.894Z"
            },
            {
                "id": "staked-ether",
                "symbol": "steth",
                "name": "Lido Staked Ether",
                "image": "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
                "current_price": 295770,
                "market_cap": 2841923880897,
                "market_cap_rank": 10,
                "fully_diluted_valuation": 2841924448346,
                "total_volume": 5672620020,
                "high_24h": 298626,
                "low_24h": 284218,
                "price_change_24h": 8337.85,
                "price_change_percentage_24h": 2.90081,
                "market_cap_change_24h": 82751043982,
                "market_cap_change_percentage_24h": 2.99913,
                "circulating_supply": 9608555.725934003,
                "total_supply": 9608557.6444835,
                "max_supply": null,
                "ath": 358528,
                "ath_change_percentage": -17.4397,
                "ath_date": "2021-11-10T14:40:47.256Z",
                "atl": 35697,
                "atl_change_percentage": 729.2071,
                "atl_date": "2020-12-22T04:08:21.854Z",
                "roi": null,
                "last_updated": "2025-01-17T15:52:53.631Z"
            }
        ]
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const inputHandler = (e) => {
        setInput(e.target.value)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        dispatch(setSearchInput(input));
    }

    return (
        <section className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text flex justify-center p-6">

            <div className="flex flex-col items-center gap-6 justify-center  p-3 sm:p-6 text-center rounded-xl dark:shadow-lg shadow-sm  dark:shadow-slate-600 shadow-zinc-600">
                <h1 className="font-bold text-4xl sm:text-5xl sm:w-[450px] flex-wrap p-4 leading-tight">
                    Explore Cryptos with Real-Time Insights.
                </h1>
                <p className="md:w-[700px] p-4 rounded-md text-xl font-serif">
                    Discover the latest cryptocurrencies with real-time data, trends, and prices. Crypto Dash keeps you informed and ahead of the curve.
                </p>

                <form onSubmit={handleSearch} className="flex gap-1 sm:gap-4 bg-light-background border-black border dark:bg-slate-300  rounded-xl p-2 sm:p-3 items-center justify-center">
                    <input type="text" placeholder="Search crypto..." className="bg-inherit outline-none font-semibold text-black capitalize placeholder:text-neutral-600 w-full p-2" onChange={inputHandler} required value={input} list="coinsList" />

                    <Button icon={<IoIosSearch size={18} />} title={"Search"} />
                    <datalist id="coinsList">
                        {allCoins?.map((item, index) => {
                            return (
                                <option key={index} value={item.name} />
                            )
                        })}
                    </datalist>
                </form>
            </div>


        </section>

    )
}

export default HeroSection
