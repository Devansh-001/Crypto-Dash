"use client"
import { IoIosSearch } from "react-icons/io"
import Button from "./Button"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSearchInput } from "@/redux/coinSlice"

const HeroSection = () => {

    const { allCoins } = useSelector(store => store.coinSlice)
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
