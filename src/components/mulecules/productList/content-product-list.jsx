import React from 'react'
import Text from '../../atoms/text'
import ContentList from './content-list'

function ContentProductList({ search }) {
    return (
        <div className='max-[480px]:mt-[65px]'>
            <div className='flex items-center gap-2 max-[480px]:hidden'>
                <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                <Text className={`font-bold`}>دسته انتخاب‌ شده</Text>
            </div>

            <ContentList search={search}/>
        </div>
    )
}

export default ContentProductList
