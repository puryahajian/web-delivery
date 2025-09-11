import React, { useState } from 'react'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempFooter from '../../template/temp-footer'
import TempBoxWhite from '../../template/temp-box-white'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import Button from '../../atoms/button'
import ContentSearch from '../../mulecules/seach/content-search'
import ContentResponsSearch from '../../mulecules/seach/content-respons-search'

function OrgSearch() {
    const [search, setSearch] = useState('');
    
    return (
        <div>
            <TempBoxMain>
                <TempHeader/>
                    <TempBoxWhite>
                       <ContentSearch setSearch={setSearch}/>
                       <ContentResponsSearch search={search}/>
                    </TempBoxWhite>
                <TempFooter/>
            </TempBoxMain>
        </div>
    )
}

export default OrgSearch
