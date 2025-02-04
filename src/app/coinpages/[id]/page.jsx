// import CoinChart from "@/app/Components/CoinChart";
// import CoinSideBar from "@/app/Components/CoinSideBar";
// import { CircularProgress } from "@mui/material";
// import { useSelector } from "react-redux";

// export const getServerSideProps = async (context) => {
//     const { id } = context.params;
//     const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
//     const coin = await res.json();

//     return {
//         props: {
//             coin,
//         }
//     }
// }



// const CoinPage = ({ coin }) => {

//     const { currency } = useSelector(store => store.coinSlice)

//     if (!coin) {
//         return <div className="flex w-full h-screen overflow-y-hidden bg-light-background justify-center items-center dark:bg-dark-background"><CircularProgress size={200} color='warning' /></div>
//     }


//     return (
//         <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text flex flex-col sm:flex-row items-center p-3 h-full">
//             <CoinSideBar coin={coin} currency={currency} />
//             <CoinChart coin={coin} currency={currency} />
//         </div>
//     )
// }

// export default CoinPage

import CoinChart from "@/app/Components/CoinChart";
import CoinSideBar from "@/app/Components/CoinSideBar";
import { CircularProgress } from "@mui/material";

const fetchCoinData = async (id) => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const coin = await res.json();
    return coin;
};

const CoinPage = async ({ params }) => {
    const id = await params.id;
    const coin = await fetchCoinData(id);

    if (!coin) {
        return (
            <div className="flex w-full h-screen overflow-y-hidden bg-light-background justify-center items-center dark:bg-dark-background">
                <CircularProgress size={200} color="warning" />
            </div>
        );
    }

    return (
        <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text flex flex-col sm:flex-row items-center p-3 h-full">
            <CoinSideBar coin={coin} />
            <CoinChart coin={coin} />
        </div>
    );
};

export default CoinPage;
