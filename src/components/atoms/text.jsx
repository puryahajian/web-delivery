import React from 'react'

function Text({children, className, onClick, style}) {
    return (
       <p lang="ar" style={style} onClick={onClick} className={`font-sans text-sm ${className}`}>{children}</p>
    )
}

export default Text
