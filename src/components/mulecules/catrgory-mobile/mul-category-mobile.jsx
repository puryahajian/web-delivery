import React from 'react'
import TempHeader from '../../template/temp-header'
import useGetCategory from '../../../hooks/use-get-category';
import ItemCategory from './item-category';

function MulCategoryMobile() {

    return (
        <div>
            <TempHeader/>
            <ItemCategory/>
        </div>
    )
}

export default MulCategoryMobile
