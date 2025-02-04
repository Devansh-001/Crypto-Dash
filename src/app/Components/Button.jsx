import { CircularProgress } from '@mui/material'
import React, { Children } from 'react'

const Button = ({ title, icon, isLoading, children, className, avatarButton, ...props }) => {
    return (
        <button
            {...props}
            className={`p-2 border-2 border-black justify-center w-[80px] flex items-center font-semibold dark:bg-dark-buttonBg dark:hover:bg-dark-buttonHover bg-light-buttonBg hover:bg-light-buttonHover rounded-md gap-2 ${props.disabled ? " dark:text-gray-400" : "dark:text-white"} ${className}`
            }
            style={avatarButton ? { backgroundColor: 'transparent', border: 'none', padding: 0 } : {}}
        >
            {icon}
            {children}
            {isLoading ? <CircularProgress size={24} color='dark:white' /> : title}
        </button>
    )
}

export default Button
