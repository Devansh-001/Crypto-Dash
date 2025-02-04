"use client";

import { useTheme } from "@/Context/ThemeContext"
import Image from "next/image"
import logo from "../../../public/logo.png"
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { MdCurrencyRupee, MdHome } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import Button from "./Button";
import { setCurrency } from "@/redux/coinSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "./Authentication/AuthModal";
import UserSidebar from "./UserSidebar";


const Navbar = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(store => store.coinSlice);


    const handleCurrency = (e) => {
        switch (e.target.value) {
            case "usd": {
                dispatch(setCurrency({ name: "usd", symbol: "$" }));
                break;
            }
            case "inr": {
                dispatch(setCurrency({ name: "inr", symbol: "₹" }));
                break;
            }
            case "eur": {
                dispatch(setCurrency({ name: "eur", symbol: "€" }));
                break;
            }
            default: {
                dispatch(setCurrency({ name: "USD", symbol: "$" }))
                break;
            }
        }
    }

    const navLinks = [
        {
            title: "Home",
            url: "/",
            icon: <MdHome />
        },
        {
            title: "Features",
            url: "/",
        },
        {
            title: "Pricing",
            url: "/"
        },
        {
            title: "Blog",
            url: "/"
        },
    ]

    const { isDarkMode, toggleTheme } = useTheme();
    return (
        <nav className="px-3 flex sticky top-0 z-20 justify-center bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text border-b-[1px] dark:border-white border-black">

            <div className="w-maxWidth flex flex-row justify-around items-center px-2">
                <Link href="/" className="flex items-center">
                    <Image src={logo} alt="logo" width={80} height={80} />
                </Link>

                <ul className="gap-4 text-lg hidden md:flex">
                    {navLinks.map((link, index) =>
                        <Link
                            className="flex items-center gap-1 dark:hover:bg-dark-hover hover:bg-light-hover rounded-md px-3 py-1"
                            href={link.url} key={index}>
                            {link?.icon}
                            {link.title}
                        </Link>
                    )}
                </ul>

                <div className="flex gap-2 md:flex-nowrap flex-wrap justify-center items-center p-1">
                    <Button icon={isDarkMode ? <IoMdSunny size={24} /> : <IoMdMoon size={24} />} onClick={toggleTheme} />

                    <div>

                        <select name="currency" className="justify-center w-[80px] flex items-center hover:cursor-pointer font-semibold dark:bg-dark-buttonBg dark:hover:bg-dark-buttonHover bg-light-buttonBg hover:bg-light-buttonHover rounded-md gap-2 p-2 border-2 border-black outline-none" onChange={handleCurrency}>
                            <option value="usd">USD</option>
                            <option value="inr">INR</option>
                            <option value="eur">EUR</option>
                        </select>
                    </div>

                    {user ? <UserSidebar /> : <AuthModal />}
                </div>
            </div>


        </nav>
    )
}

export default Navbar
