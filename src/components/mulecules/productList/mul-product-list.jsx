import React, { useState } from 'react'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempFooter from '../../template/temp-footer'
import TempBoxWhite from '../../template/temp-box-white'
import Input from '../../atoms/input'
import ContentProductList from './content-product-list'
import Text from '../../atoms/text'

function MulProductList() {
    const [search, setSearch] = useState("");

    return (
        <div>
            <TempBoxMain>
                <TempHeader/>
                    <div className='grid grid-cols-4 gap-6'>
                        <div>
                            <TempBoxWhite className={`!mt-0`}>
                                <Input 
                                    placeholder={'جستجو'} 
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)} 
                                />
                            </TempBoxWhite>

                            <TempBoxWhite>
                                <div className='flex items-center justify-center'>
                                    <Text>به زودی!</Text>
                                </div>
                            </TempBoxWhite>
                        </div>
                        <div className='col-span-3'>
                            <TempBoxWhite className={`!mt-0`}>
                                <ContentProductList search={search}/>
                            </TempBoxWhite>
                        </div>
                    </div>
                <TempFooter/>
            </TempBoxMain>
        </div>
    )
}

export default MulProductList
