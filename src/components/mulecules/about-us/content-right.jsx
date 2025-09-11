import React from 'react'
import About from '../../../assets/image/undraw_team-spirit_18vw.svg'

function ContentRight() {
    return (
        <div>
            <img src={About} className='w-[424px] min-w-[424px] max-w-[424px] h-[424px] min-h-[424px] max-h-[424px] max-[480px]:w-full max-[480px]:max-w-full max-[480px]:min-w-full rounded-2xl' alt="" /> 
        </div>
    )
}

export default ContentRight
