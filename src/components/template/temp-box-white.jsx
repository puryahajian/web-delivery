import React from 'react'

function TempBoxWhite({children, className}) {
    return (
        <div className={`mt-10 p-6 bg-white rounded-[8px] ${className}`}>
            {children}
        </div>
    )
}

export default TempBoxWhite
