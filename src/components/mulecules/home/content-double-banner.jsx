import React from 'react'
import AvatarButton from '../avatar-button'
import Banner1 from '../../../assets/image/banner-1.png'
import useGetBanner from '../../../hooks/use-get-banner'

function ContentDoubleBanner() {
    const {data} = useGetBanner();
    // console.log(data)

    return (
        <div className=' grid grid-cols-2 mt-[72px] gap-4 max-[480px]:hidden'>
            <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full h-[300px]`}
                height="100%"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${data?.[0]?.image}`}
                boxFit="cover"
            />
            <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full h-[300px]`}
                height="100%"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${data?.[1]?.image}`}
                boxFit="cover"
            />
        </div>
    )
}

export default ContentDoubleBanner
