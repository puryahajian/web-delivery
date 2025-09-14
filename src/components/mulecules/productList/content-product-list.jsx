import React from 'react'
import Text from '../../atoms/text'
import ContentList from './content-list'

function ContentProductList({ search }) {
    return (
        <div>
            <div className='flex items-center gap-2'>
                <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                <Text className={`font-bold`}>دسته‌بندی منتخب</Text>
            </div>

            <ContentList search={search}/>
        </div>
    )
}

export default ContentProductList
