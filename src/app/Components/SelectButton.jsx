import React from 'react'

const SelectButton = ({ children, onClick, selected }) => {
    return (
        <button
            onClick={onClick}
            className={`rounded-md w-full sm:flex-1 dark:bg-light-background bg-dark-background dark:text-light-text sm:px-10 py-2 text-[12px] sm:text-lg md:text-xl text-yellow-200 ${selected ? "font-bold" : "font-extralight "} dark:hover:text-black dark:hover:bg-orange-400 hover:text-white hover:bg-black`}
        >
            {children}
        </button>
    )
}

export default SelectButton
