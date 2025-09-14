import React from 'react'

function TempBoxMain({children, className}) {
    return (
        <div className={`px-[64px] mt-[140px] max-[990px]:px-6 max-[480px]:px-4 max-[480px]:mt-6 ${className}`}>
            {children}
        </div>
    )
}

export default TempBoxMain
