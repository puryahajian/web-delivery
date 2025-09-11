import React, { useEffect, useState } from 'react'
import Text from '../../atoms/text'
import Mapp from './mapp'


function ContentMap({ setAddressPreview ,setLocation}) {

    return (
        <div className='pr-4'>
            <div className='flex items-center gap-2'>
                <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                <Text>آدرس خود را دقیق وارد کنید</Text>
            </div>
            <div className='mt-4 rounded-2xl'>
                <Mapp setAddressPreview={setAddressPreview} setLocation={setLocation} />
            </div>
        </div>
    )
}

export default ContentMap
