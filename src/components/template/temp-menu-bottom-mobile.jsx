import React from 'react'
import Text from '../atoms/text';
import { Link, useLocation } from 'react-router-dom';

function TempMenuBottomMobile() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const isActiveOrder = location.pathname.startsWith('/active-order');

    return (
        <div className={`fixed bottom-0 right-0 w-full bg-white py-4 hidden max-[480px]:block 
            ${location.pathname === '/login' && 'max-[480px]:hidden'} 
            ${location.pathname === '/profile' && 'max-[480px]:hidden'}
            ${location.pathname === '/transaction' && 'max-[480px]:hidden'}
            ${location.pathname === '/cart' && 'max-[480px]:hidden'}
            ${location.pathname.startsWith("/product-list") && 'max-[480px]:hidden'}
            ${location.pathname.startsWith("/product-detail") && 'max-[480px]:hidden'}
            ${location.pathname === '/content-us' && 'max-[480px]:hidden'}
            ${location.pathname === '/about-us' && 'max-[480px]:hidden'}
            `}>
            <div className='flex justify-center gap-[100px]'>
                <Link to="/" aria-current={isHome ? 'page' : undefined}>
                    <div className={`text-center ${isHome ? 'text-[#2b2b2b]' : 'text-gray-400'}`}>
                        <svg 
                            width="25" 
                            height="25" 
                            className='m-auto'
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M9.385 21.012v-3.058c0-.78.637-1.413 1.423-1.413h2.875c.377 0 .74.149 1.006.414.267.265.417.624.417.999v3.058c-.002.324.126.636.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 002.443-1 3.41 3.41 0 001.013-2.423v-8.71c0-.735-.328-1.432-.895-1.903l-6.671-5.289a3.097 3.097 0 00-3.949.071L3.717 8.203a2.474 2.474 0 00-.967 1.902v8.702c0 1.895 1.547 3.431 3.456 3.431h1.916c.68 0 1.231-.543 1.236-1.217l.027-.01z" 
                                    fill={isHome ? '#2b2b2b' : '#9ca3af'}
                                />
                        </svg>
                        <Text className={`mt-1 ${isHome ? ' !font-bold' : '!text-gray-400'}`}>خانه</Text>
                    </div>
                </Link>

                <Link to="/active-order" aria-current={isActiveOrder ? 'page' : undefined}>
                    <div className={`text-center ${isActiveOrder ? 'text-[#2b2b2b]' : 'text-gray-400'}`}>
                        <svg 
                            width="25" 
                            className='m-auto'
                            height="25" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    fill-rule="evenodd" 
                                    clip-rule="evenodd" 
                                    d="M8.56 2.238h8.381c3.089 0 4.809 1.78 4.809 4.83v10.33c0 3.1-1.72 4.84-4.809 4.84H8.56c-3.04 0-4.81-1.74-4.81-4.84V7.068c0-3.05 1.77-4.83 4.81-4.83zm.27 4.66v-.01h2.989c.431 0 .781.35.781.78 0 .44-.35.79-.781.79H8.83a.78.78 0 010-1.56zm0 6.08h7.84a.781.781 0 000-1.56H8.83a.781.781 0 000 1.56zm0 4.57h7.84c.399-.04.7-.38.7-.78 0-.41-.301-.75-.7-.79H8.83a.795.795 0 00-.75 1.21c.16.25.45.4.75.36z" 
                                    fill={isActiveOrder ? '#2b2b2b' : '#9ca3af'}
                                />
                        </svg>
                        <Text className={`mt-1 ${isActiveOrder ? ' !font-bold' : '!text-gray-400'}`}>سفارش‌ها</Text>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default TempMenuBottomMobile
