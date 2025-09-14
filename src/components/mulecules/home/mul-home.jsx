import React, { useState } from 'react'
import TempHeader from '../../template/temp-header'
import TempBoxMain from '../../template/temp-box-main'
import AvatarButton from '../avatar-button'
import Banner1 from '../../../assets/image/banner-1.png'
import ContentCategory from './content-category'
import ContentDoubleBanner from './content-double-banner'
import ContentDiscount from './content-discount'
import BestSeller from './best-seller'
import TempFooter from '../../template/temp-footer'
import useGetOption from '../../../hooks/use-get-option'
import StoryCarousel from './stories'
import ContentFourBanner from './content-four-banner'
import ContentSupport from './content-support'



function MulHome({setModalLogOut}) {
    const {data} = useGetOption();
    const getData = data?.results[0]

    return (
        <div className='max-[480px]:mb-24'>
            <TempHeader setModalLogOut={setModalLogOut} />   

            <TempBoxMain className={`mt-[98px] max-[480px]:mt-[117px]`}>
                {/* time shop */}
                <div className="items-center gap-1 mt-32 bg-BgTimer py-2 px-2 rounded-lg hidden max-[480px]:flex max-[480px]:justify-between">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width={24} 
                        height={24} 
                        viewBox="0 0 24 24">
                            <path 
                                fill="#ca4f4f" 
                                d="M6.53 3.47a.75.75 0 0 1 0 1.06l-2.5 2.5a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0">
                                    </path>
                                    <path 
                                    fill="#ca4f4f" 
                                    fillRule="evenodd" 
                                    d="M12 4.5a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17m.75 3.5a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 .352.636l3 1.875a.75.75 0 1 0 .796-1.272l-2.648-1.655z" 
                                    clipRule="evenodd">
                                        </path>
                                        <path 
                                        fill="#ca4f4f" 
                                        d="M17.47 4.53a.75.75 0 0 1 1.06-1.06l2.5 2.5a.75.75 0 0 1-1.06 1.06z">
                            </path>
                    </svg>
                    <div className='flex gap-2'>
                        {data?.results[0]?.open_time === null ? (
                            ' غير متوفر '
                        ) : (
                            <>
                            ساعات کاری از ساعت 
                                <span className="text-BgBlue">{data?.results[0]?.open_time?.slice(0, -3)}</span>
                                تا 
                                <span className="text-BgBlue">{data?.results[0]?.close_time?.slice(0, -3)}</span>
                            </>
                        )}
                    </div>
                </div>
                {/* <StoryCarousel/> */}
            </TempBoxMain>

            <div className='max-[480px]:p-2 max-[480px]:mx-4 max-[480px]:border max-[480px]:border-Gray1 max-[480px]:rounded-lg max-[480px]:mt-[16px]'>
                <AvatarButton
                    // onTap={handleClick}
                    width="100%"
                    className={`w-full mt-3 max-[480px]:mt-0 h-[400px] max-[480px]:h-[160px]`}
                    height="100%"
                    padding={0}
                    borderRadius="0"
                    border='white'
                    borderRadiusImage="4px"
                    check={true}
                    image={getData?.banner_one}
                    boxFit="cover"
                />
            </div>

            <div className='hidden max-[480px]:flex max-[480px]:my-6'>
                <hr className='w-[85%] m-auto' />
            </div>

            <TempBoxMain>

                <ContentCategory/>

                <ContentDoubleBanner/>

                <div className='hidden max-[480px]:flex max-[480px]:mt-6'>
                    <hr className='w-[85%] m-auto' />
                </div>

                <ContentDiscount/>

                <div className='hidden max-[480px]:flex max-[480px]:mb-6'>
                    <hr className='w-[85%] m-auto' />
                </div>

                <AvatarButton
                    // onTap={handleClick}
                    width="100%"
                    className={`w-full h-[500px] max-[480px]:h-[160px]`}
                    height="100%"
                    borderRadius="8px"
                    borderRadiusImage="4px"
                    check={true}
                    image={getData?.banner_two}
                    boxFit="cover"
                />

                <BestSeller/>

                <ContentFourBanner/>

                <ContentSupport/>
                
                <TempFooter/>
            </TempBoxMain>

        </div>
    )
}

export default MulHome
