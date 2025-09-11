import React from 'react'

function Button({className, children, onClick}) {
    return (
        <button onClick={onClick} className={`font-sans rounded-[8px] text-white bg-BgCustom ${className}`}>
            {children}
        </button>
    )
}

export default Button
