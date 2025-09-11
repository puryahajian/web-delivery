import React, { useState } from 'react'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempFooter from '../../template/temp-footer'
import ContentProduct from './content-product'

function MulProductId() {


    
    return (
        <div>
            <TempBoxMain>
                <TempHeader />
                <ContentProduct/>
                <TempFooter/>
            </TempBoxMain>
        </div>
    )
}

export default MulProductId
