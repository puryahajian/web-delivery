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
            <TempHeader/>
            <TempBoxMain className={`max-[480px]:mt-[50px] max-[480px]:!px-0`}>
                    <div className='grid grid-cols-4 gap-6 max-[480px]:gap-0 max-[480px]:grid-cols-1'>
                        <div>
                            <TempBoxWhite className={`!mt-0 max-[480px]:fixed max-[480px]:top-[50px] max-[480px]:px-5 max-[480px]:pb-0 max-[480px]:right-0 max-[480px]:w-full`}>
                                <Input placeholder={'جستجو'} value={search} onChange={e => setSearch(e.target.value)} />
                            </TempBoxWhite>

                            <TempBoxWhite className={`max-[480px]:hidden`}>
                                <div className='flex items-center justify-center'>
                                    <Text>به‌زودی!</Text>
                                </div>
                            </TempBoxWhite>
                        </div>
                        <div className='col-span-3 max-[480px]:col-span-1'>
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
