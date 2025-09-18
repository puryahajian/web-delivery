import React, { useState } from 'react'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempFooter from '../../template/temp-footer'
import ContentCart from './content-cart'
import TempBoxWhite from '../../template/temp-box-white'

function MulCart() {
    return (
        <div>
            <TempBoxMain>
                <TempHeader/>
                <TempBoxWhite className={`max-[480px]:px-0 max-[480px]:mt-12 max-[480px]:mb-20`}>
                    <ContentCart/>
                </TempBoxWhite>
                <TempFooter/>
            </TempBoxMain>
        </div>
    )
}

export default MulCart
