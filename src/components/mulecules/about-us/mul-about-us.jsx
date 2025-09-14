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
            <TempBoxMain>
                <TempHeader/>
                <TempBoxWhite>
                    <div className='flex gap-12'>
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
