import React, { useState } from 'react'
import ContentRight from './content-right'
import ContentLeft from './content-left'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempBoxWhite from '../../template/temp-box-white'
import TempFooter from '../../template/temp-footer'

function MulAboutUs() {
    
    return (
        <div>
            <TempHeader/>
            <TempBoxMain>
                <TempBoxWhite className={`max-[480px]:mb-[80px] max-[480px]:px-0`}>
                    <div className='flex gap-12 max-[480px]:grid max-[480px]:grid-cols-1'>
                        <ContentRight/>

                        <div className='w-full'>
                            <ContentLeft/>      
                        </div>
                    </div>
                </TempBoxWhite>
                <TempFooter/>
            </TempBoxMain>
        </div>
    )
}

export default MulAboutUs
