"use client"

import { CircularProgress } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ThemeProvider, useTheme } from '@/Context/ThemeContext';
import SelectButton from './SelectButton';
import { useSelector } from 'react-redux';
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);



const CoinChart = () => {
    const { id } = useParams();
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = useSelector(store => store.coinSlice)
    const { isDarkMode } = useTheme();

    const fetchHistoricalData = async (id, days = 365, currency) => {

        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=${days}`);

        const data = await res.json();
        setHistoricalData(data)
    }

    useEffect(() => {
        fetchHistoricalData(id, days, currency)
    }, [days, currency])



    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    return (
        <div className='flex flex-col items-center gap-2 w-full sm:w-[70%] sm:p-6'>

            {!historicalData ?
                <CircularProgress
                    size={125}
                    thickness={1}
                    color='white'
                />
                :
                <>
                    <Line
                        data={{
                            labels: historicalData.prices.map((coin) => {

                                const date = new Date(coin[0]);
                                const time = date.getHours() > 12 ?
                                    `${date.getHours() - 12}:${date.getMinutes()} PM` :
                                    `${date.getHours()}:${date.getMinutes()} AM`;

                                return days === 1 ? time : date.toLocaleDateString();

                            }),
                            datasets: [
                                {
                                    data: historicalData.prices.map((coin) => coin[1]),
                                    label: `Price (Past ${days} Days) in ${currency.name}`,
                                    borderColor: `${isDarkMode ? "white" : "black"}`,
                                    backgroundColor: `${isDarkMode ? "white" : "black"}`,
                                }
                            ]
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 1,
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: isDarkMode ? "orange" : "black",
                                    },
                                    grid: {
                                        color: isDarkMode ? "black" : "white",
                                    }
                                },
                                y: {
                                    ticks: {
                                        color: isDarkMode ? "orange" : "black",
                                    },
                                    grid: {
                                        color: isDarkMode ? "black" : "white",
                                    }
                                },

                            }
                        }}
                    />



                    <div className='flex w-full flex-wrap gap-3 justify-between p-6'>
                        {
                            chartDays.map((day) => {
                                return (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => setDays(day.value)}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                )
                            }
                            )
                        }
                    </div>
                </>

            }

        </div>
    )
}

export default CoinChart
