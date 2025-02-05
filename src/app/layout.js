"use client"

import "./globals.css";
import Navbar from "./Components/Navbar";
import { ThemeProvider } from "@/Context/ThemeContext";
import { Provider } from "react-redux";
import store from "@/redux/store";
import SetUser from "./Components/Authentication/SetUser";
import CustomizedSnackbars from "./Components/Authentication/CustomizedSnackbars";
import SetWatchlist from "./Components/Authentication/SetWatchlist";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/trader.png" sizes="512x512" />
        <title>Crypto Dash</title>
        <meta name="description" content="A simple web app to allow traders to stay ahead of their competition in the crypto world." />
        <meta name="keywords" content="crypto, bitcoin, ethereum, blockchain, trading, altcoins, cryptocurrency, crypto market, crypto news, decentralized finance, DeFi, NFTs, smart contracts, crypto trading platform, bitcoin price, crypto portfolio, ethereum price, altcoin trading, digital assets, blockchain technology, crypto investment, crypto analysis, crypto dashboard" />


        <meta property="og:title" content="Crypto Dash" />
        <meta property="og:description" content="A simple web app to allow traders to stay ahead of their competition in the crypto world." />
        <meta property="og:image" content="/trader.png" />
        <meta property="og:url" content="https://crypto-dash-00001.netlify.app" />
        <meta property="og:type" content="website" />


        <meta name="twitter:title" content="Crypto Dash" />
        <meta name="twitter:description" content="A simple web app to allow traders to stay ahead of their competition in the crypto world." />
        <meta name="twitter:image" content="/trader.png" />
        <meta name="twitter:card" content="summary_large_image" />


      </head>
      <body>
        <ThemeProvider>
          <Provider store={store}>
            <SetUser />
            <SetWatchlist />
            <Navbar />
            {children}
            <CustomizedSnackbars />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
