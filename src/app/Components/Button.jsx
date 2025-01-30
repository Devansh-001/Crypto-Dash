import React from 'react'

const Button = ({ title, icon, ...props }) => {
    return (
        <button
            {...props}
            className="p-2 border-2 border-black justify-center w-[70px] flex items-center font-semibold dark:bg-dark-buttonBg dark:hover:bg-dark-buttonHover bg-light-buttonBg hover:bg-light-buttonHover rounded-md gap-2">
            {icon} {title}
        </button>
    )
}

export default Button
