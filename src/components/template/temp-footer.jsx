import React from 'react'
import '../../App.css'
import Text from '../atoms/text'
import AvatarButtonHeader from '../mulecules/avatar-button-header'
import Bag from '../../assets/image/Iconly/Bag.svg'

import Button from '../atoms/button'
import { useLocation } from 'react-router-dom'
import useGetOption from '../../hooks/use-get-option'

function TempFooter() {
    const {data} = useGetOption();
    const getData =  data?.results[0];

    const location = useLocation();

    return (
        <div className='border h-[425px] max-[990px]:h-max mt-[100px] bg-BgFooter rounded-[8px] flex justify-center relative p-6 max-[480px]:hidden' style={{direction: 'rtl'}}>
            <div className={`absolute m-auto bottom-0 -mb-7 rounded-tr-[56px] rounded-tl-[56px] p-4 ${location.pathname !== '/' ? 'bg-[#E6E6E6]' : 'bg-white'}`}> 
                <div className={`w-8 h-8 bg-BgFooter absolute -right-[29px] top-[20px] rounded-bl-[32px] ${location.pathname !== '/' ? 'shadow-[-3px_11px_0_2px_#E6E6E6]' : 'shadow-[-3px_11px_0_2px_white]'}`}></div>
                <div className={`w-8 h-8 bg-BgFooter absolute -left-[29px] top-[20px] rounded-br-[32px] ${location.pathname !== '/' ? 'shadow-[6px_11px_0_2px_#E6E6E6]' : 'shadow-[6px_11px_0_2px_white]'}`}></div>

                <Button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className={` p-3 !rounded-full  hover:scale-110 transition-all ease-in-out duration-100`}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width={24} 
                            height={24} 
                            viewBox="0 0 24 24">
                                <path 
                                fill="white" 
                                fillRule="evenodd" 
                                d="M12 5.714a1 1 0 0 1 1 1v12.5a1 1 0 0 1-2 0v-12.5a1 1 0 0 1 1-1" 
                                clipRule="evenodd">
                                    </path>
                                    <path 
                                    fill="white" 
                                    fillRule="evenodd" 
                                    d="M12 4.214a1 1 0 0 1 .707.293l4.5 4.5a1 1 0 0 1-1.414 1.415L12 6.628l-3.793 3.793a1 1 0 0 1-1.414-1.415l4.5-4.5A1 1 0 0 1 12 4.214" 
                                    clipRule="evenodd">
                                </path>
                        </svg>
                </Button>
            </div>
            

            <div className=' w-full'>
                <div className='w-full flex gap-4 justify-between max-[990px]:block'>
                    <div className='max-w-[700px]'>
                        <Text className={`text-white font-bold text-base`}>درباره سایت</Text>
                        <Text style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 6,     // تعداد خطوط
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }} className={`text-gray-300 mt-4`}>
                            {getData?.about_us}
                        </Text>

                        {/* <div className='flex justify-between flex-wrap mt-14'>
                            <div>
                                <Text className={`text-white font-bold text-base`}>خدمات الموقع</Text>

                                <ul className='mt-4 grid gap-2'>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Text className={`text-white font-bold text-base`}>الوصول السريع</Text>

                                <ul className='mt-4 grid gap-2'>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <Text className={`text-white font-bold text-base`}>خدمة العملاء</Text>

                                <ul className='mt-4 grid gap-2'>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                    <li>
                                        <Text className={`text-white`}>خدمات الموقع</Text>
                                    </li>
                                </ul>
                            </div>
                        </div> */}

                    </div>

                    <div className='bg-white min-w-[300px] rounded-lg p-6 max-[990px]:my-12 max-[990px]:w-full'>
                        <ul className='grid gap-[18px]'>
                            <li className='flex gap-4'>
                                <AvatarButtonHeader
                                    src={Bag}
                                    className={`flex items-center rounded-lg w-max min-w-10 min-h-10 font-bold bg-Gray1`}
                                    classImg={`p-[10px] border-transparent`}
                                />
                                <div>
                                    <Text className={`font-bold`}>آدرس</Text>
                                    <Text>{getData?.address === "" ? 'در دسترس نیست' : getData?.address}</Text>
                                </div>
                            </li>
                            <li className='flex gap-4'>
                                <AvatarButtonHeader
                                    // src={Bag}
                                    className={`flex items-center justify-center rounded-lg w-max min-w-10 min-h-10 font-bold bg-Gray1`}
                                    classImg={`hidden`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 512 512"><path fill="#ca4f4f" d="M331 374.8c-8.2-16.9-18.8-29.2-37.1-21.7l-36.1 13.4c-28.9 13.4-43.3 0-57.8-20.2l-65-147.8c-8.2-16.9-3.9-32.8 14.4-40.3l50.5-20.2c18.3-7.6 15.4-23.4 7.2-40.3L164 17.1c-8.2-16.9-25-21-43.3-13.5c-36.7 15.1-67 38.8-86.6 73.9c-24 42.9-12 102.6-7.2 127.7s21.6 69.1 43.3 114.2c21.7 45.2 40.7 80.7 57.8 100.8c17 20.1 57.8 75.1 108.3 87.4c41.4 10 86.1 1.6 122.7-13.5c18.3-7.5 18.4-23.4 10.2-40.4zM305.3 256c16.3 0 29.6-13.2 29.6-29.6c0-16.3-13.2-29.6-29.6-29.6c-16.3 0-29.6 13.2-29.6 29.6c0 16.3 13.3 29.6 29.6 29.6m78.8-59.2c-16.3 0-29.6 13.2-29.6 29.6c0 16.3 13.2 29.6 29.6 29.6c16.3 0 29.6-13.2 29.6-29.6c-.1-16.3-13.3-29.6-29.6-29.6m78.8 0c-16.3 0-29.6 13.2-29.6 29.6c0 16.3 13.2 29.6 29.6 29.6c16.3 0 29.6-13.2 29.6-29.6c-.1-16.3-13.3-29.6-29.6-29.6"></path></svg>
                                </AvatarButtonHeader>
                                <div>
                                    <Text className={`font-bold`}>پشتیبانی</Text>
                                    <Text>{getData?.support_phone === null ? 'در دسترس نیست' : getData?.support_phone}</Text>
                                </div>
                            </li>
                            <li className='flex gap-4'>
                                <AvatarButtonHeader
                                    // src={Bag}
                                    className={`flex items-center justify-center rounded-lg w-max min-w-10 min-h-10 font-bold bg-Gray1`}
                                    classImg={`hidden`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="#ca4f4f" d="M21.99 6.547a11 11 0 0 0-.103-1.282a4.3 4.3 0 0 0-.363-1.09A3.85 3.85 0 0 0 19.83 2.48a4.3 4.3 0 0 0-1.083-.362a11 11 0 0 0-1.292-.105c-.183-.007-.42-.01-.53-.01L7.077 2c-.11 0-.347.003-.53.01a11 11 0 0 0-1.282.103a4.3 4.3 0 0 0-1.09.363A3.85 3.85 0 0 0 2.48 4.17a4.3 4.3 0 0 0-.362 1.083a11 11 0 0 0-.106 1.292c-.006.183-.01.42-.01.53L2 16.923c0 .11.003.347.01.53a11 11 0 0 0 .103 1.282a4.3 4.3 0 0 0 .363 1.09A3.85 3.85 0 0 0 4.17 21.52a4.3 4.3 0 0 0 1.083.362a11 11 0 0 0 1.292.105c.183.007.42.01.53.01l9.848.002c.11 0 .347-.003.53-.01a11 11 0 0 0 1.282-.103a4.3 4.3 0 0 0 1.09-.363a3.85 3.85 0 0 0 1.696-1.694a4.3 4.3 0 0 0 .362-1.083a11 11 0 0 0 .106-1.292c.006-.183.01-.42.01-.53L22 7.077c0-.11-.003-.347-.01-.53m-9.773 12.41h-.003a7.1 7.1 0 0 1-3.407-.868l-3.78.991l1.012-3.693a7.13 7.13 0 1 1 6.178 3.57"></path><path fill="#ca4f4f" d="M12.22 5.901a5.927 5.927 0 0 0-5.023 9.076l.141.224l-.599 2.186l2.243-.588l.216.128a5.9 5.9 0 0 0 3.016.826h.003A5.926 5.926 0 0 0 12.219 5.9Zm3.484 8.47a1.83 1.83 0 0 1-1.202.847a2.44 2.44 0 0 1-1.122-.07a10 10 0 0 1-1.015-.376a7.94 7.94 0 0 1-3.043-2.689a3.46 3.46 0 0 1-.728-1.842a2 2 0 0 1 .624-1.485a.66.66 0 0 1 .475-.223c.118 0 .237 0 .341.006c.11.005.256-.042.4.306c.15.356.506 1.233.55 1.322a.33.33 0 0 1 .015.312a1.2 1.2 0 0 1-.178.297c-.09.104-.187.232-.267.312c-.09.089-.182.185-.079.363a5.4 5.4 0 0 0 .991 1.234a4.9 4.9 0 0 0 1.433.884c.178.09.282.074.386-.045s.445-.52.564-.698s.237-.148.4-.089s1.04.49 1.218.58s.297.133.341.207a1.5 1.5 0 0 1-.104.847"></path></svg>
                                </AvatarButtonHeader>
                                <div>
                                    <Text className={`font-bold`}>واتساپ</Text>
                                    <Text>{getData?.whatsApp === null ? 'در دسترس نیست' : getData?.whatsApp}</Text>
                                </div>
                            </li>
                            <li className='flex gap-4'>
                                <AvatarButtonHeader
                                    // src={Bag}
                                    className={`flex items-center justify-center rounded-lg w-max min-w-10 min-h-10 font-bold bg-Gray1`}
                                    classImg={`hidden`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="#ca4f4f" d="M17.688 21.744a2.02 2.02 0 0 1-1.242-.427l-4.03-3.122l-2.702 2.983a1 1 0 0 1-1.698-.383l-2.02-6.682l-3.626-1.26a2.042 2.042 0 0 1-.103-3.818L20.187 1.8a2.042 2.042 0 0 1 2.771 2.295L19.695 20.11a2.054 2.054 0 0 1-2.008 1.633Z" opacity={0.5}></path><path fill="#ca4f4f" d="M8.973 21.506a1 1 0 0 1-.957-.71l-2.168-7.16a1 1 0 0 1 .495-1.176L16.91 6.958a1 1 0 0 1 1.17 1.594l-7.084 7.083l-1.044 5.072a1 1 0 0 1-.933.798z"></path></svg>
                                </AvatarButtonHeader>
                                <div>
                                    <Text className={`font-bold`}>تلگرام</Text>
                                    <Text>{getData?.telegram === null ? 'در دسترس نیست' : getData?.telegram}</Text>
                                </div>
                            </li>
                             <li className='flex gap-4'>
                                <AvatarButtonHeader
                                    // src={Bag}
                                    className={`flex items-center justify-center rounded-lg w-max min-w-10 min-h-10 font-bold bg-Gray1`}
                                    classImg={`hidden`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="#ca4f4f" d="M12 6.865A5.135 5.135 0 1 0 17.135 12A5.135 5.135 0 0 0 12 6.865m0 8.469A3.334 3.334 0 1 1 15.334 12A3.333 3.333 0 0 1 12 15.334"></path><path fill="#ca4f4f" d="M21.94 7.877a7.3 7.3 0 0 0-.465-2.427a4.9 4.9 0 0 0-1.153-1.772a4.9 4.9 0 0 0-1.77-1.153a7.3 7.3 0 0 0-2.428-.464C15.058 2.012 14.717 2 12.001 2s-3.057.011-4.123.06a7.3 7.3 0 0 0-2.428.465a4.9 4.9 0 0 0-1.77 1.153A4.9 4.9 0 0 0 2.525 5.45a7.3 7.3 0 0 0-.464 2.427c-.05 1.066-.06 1.407-.06 4.123s.01 3.057.06 4.123a7.3 7.3 0 0 0 .464 2.427a4.9 4.9 0 0 0 1.154 1.772a4.9 4.9 0 0 0 1.771 1.153a7.3 7.3 0 0 0 2.428.464C8.944 21.988 9.285 22 12 22s3.057-.011 4.123-.06a7.3 7.3 0 0 0 2.427-.465a5.1 5.1 0 0 0 2.925-2.925a7.3 7.3 0 0 0 .465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.057-.06-4.123m-1.8 8.164a5.6 5.6 0 0 1-.343 1.857a3.3 3.3 0 0 1-1.898 1.898a5.5 5.5 0 0 1-1.857.344c-1.055.048-1.371.058-4.042.058s-2.986-.01-4.04-.058a5.5 5.5 0 0 1-1.857-.344a3.1 3.1 0 0 1-1.15-.748a3.1 3.1 0 0 1-.748-1.15a5.5 5.5 0 0 1-.344-1.857c-.048-1.054-.058-1.37-.058-4.04s.01-2.987.058-4.042a5.6 5.6 0 0 1 .344-1.857a3.1 3.1 0 0 1 .748-1.15a3.1 3.1 0 0 1 1.15-.748A5.5 5.5 0 0 1 7.96 3.86C9.014 3.81 9.331 3.8 12 3.8s2.987.011 4.042.059a5.6 5.6 0 0 1 1.857.344a3.3 3.3 0 0 1 1.898 1.898a5.5 5.5 0 0 1 .344 1.857c.048 1.055.058 1.37.058 4.041s-.01 2.986-.058 4.041M17.339 5.462"></path></svg>
                                </AvatarButtonHeader>
                                <div>
                                    <Text className={`font-bold`}>اینستاگرام</Text>
                                    <Text>{getData?.instagram === null ? 'در دسترس نیست' : getData?.instagram}</Text>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TempFooter
