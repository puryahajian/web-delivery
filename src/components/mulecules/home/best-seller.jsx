import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Text from '../../atoms/text'
import { CardShopProductWallet } from '../card-shop-product-wallet'
import IconCardShopProduct from '../../../assets/image/plus.png'
import useGetBestSeller from '../../../hooks/use-get-best-seller'
import useGetBanner from '../../../hooks/use-get-banner'
import { useCart } from '../../../context/CartContext'
import toast from 'react-hot-toast'

function BestSeller() {
    const {data} = useGetBestSeller();
    // console.log(data)
    const { cart, addToCart } = useCart();
    // console.log(cart)
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const handleCardClick = (id) => {
        navigate(`/product-detail/${id}`);
    }

    const handleGetData = (item) => {
        addToCart(item)
        toast.success('به سبد خرید اضافه شد');
    }

    const scrollSlider = (direction) => {
        if (!sliderRef.current) return;
        const scrollAmount = 340; // Adjust based on card size
        if (direction === 'left') {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
    // Group items in pairs for vertical stacking
    const grouped = [];
    if (data?.results?.length) {
        for (let i = 0; i < data.results.length; i += 2) {
            grouped.push(data.results.slice(i, i + 2));
        }
    }
    return (
        <div className='mt-[72px] max-[480px]:mt-8'>
            <div className='flex items-center gap-2 mb-6'>
                <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                <Text className={`font-bold text-BgBlue`}>پرفروش‌ترین</Text>
            </div>
            <div className='relative'>
                <button onClick={() => scrollSlider('left')} className='absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition max-[480px]:hidden'>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div ref={sliderRef} className='flex gap-[18px] overflow-x-auto scroll-slider scrollbar-thin scrollbar-thumb-gray-300 pb-2 scroll-smooth'>
                    {grouped?.slice(-9)?.map((pair, idx) => (
                        <div key={idx} className='flex flex-col gap-4 min-w-[290px]'>
                            {pair?.map((item) => (
                                <CardShopProductWallet
                                    key={item?.id}
                                    onClickCard={() => handleCardClick(item?.id)}
                                    imageCard={item?.image}
                                    paddingCard="10px"
                                    borderCard="1px solid #aaa"
                                    borderRadiusCard="8px"
                                    backgroundColorCard="white"
                                    product={item?.name}
                                    price={`${item?.price?.toLocaleString('fa-IR')} تومان`}
                                    style={{ color: "#222", fontWeight: "bold" }}
                                    styleOffer={{ fontSize: "13px" }}
                                    avatarButtonConfig={{
                                        onClick: () => handleGetData(item),
                                        icon: <img src={IconCardShopProduct} alt="" srcSet="" />, 
                                        borderRadius: "8px",
                                        width: "40px",
                                        height: "40px",
                                        iconColor: "#444",
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={() => scrollSlider('right')} className='absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition max-[480px]:hidden'>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
            </div>
        </div>
    )
}

export default BestSeller
