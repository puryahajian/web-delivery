import React from 'react'
import AvatarButton from '../avatar-button'
import useGetBanner from '../../../hooks/use-get-banner';

function ContentFourBanner() {
    const {data: dataBanner} = useGetBanner();
    const lastFourBanners = dataBanner?.slice(-4) || [];
    // console.log(lastFourBanners)
    
    return (
        <div className='mt-[72px] grid grid-cols-4 max-[1200px]:grid-cols-2 gap-4 max-[480px]:hidden'>
            <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full`}
                height="200px"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${lastFourBanners?.[0]?.image}`}
                boxFit="cover"
            />
            <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full`}
                height="200px"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${lastFourBanners?.[1]?.image}`}
                boxFit="cover"
            />
                <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full`}
                height="200px"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${lastFourBanners?.[2]?.image}`}
                boxFit="cover"
            /> <AvatarButton
                // onTap={handleClick}
                width="100%"
                className={`w-full`}
                height="200px"
                borderRadius="8px"
                borderRadiusImage="4px"
                check={true}
                image={`https://api.nowdesign.ir${lastFourBanners?.[3]?.image}`}
                boxFit="cover"
            />
        </div>
    )
}

export default ContentFourBanner
