import React, { useRef } from 'react'
import Text from '../../atoms/text'
import { CardShopProduct } from '../card-shop-product'
import ImgDiscount from '../../../assets/image/item-discount.png'
import IconCardShopProduct from '../../../assets/image/plus.png'
import useGetWithDiscount from '../../../hooks/use-get-width-discount'
import { useNavigate } from 'react-router-dom'
import '../../../App.css'
import { useCart } from '../../../context/CartContext'
import toast from 'react-hot-toast'
import usePostAddToCart from '../../../hooks/use-post-add-to-cart'
import Cookies from "js-cookie";

function ContentDiscount() {
    const {data} = useGetWithDiscount();
    const { cart, addToCart } = useCart();
    const { mutate } = usePostAddToCart();
    const accessToken = Cookies.get('access');
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const handleCardClick = (id) => {
        navigate(`/product-detail/${id}`);
    }
    const handleClick = (item) => {
        addToCart(item)
        toast.success('به سبد خرید اضافه شد');
    }

    const handleAddToCart = (itemId) => {
        mutate(
            { 
                itemId 
            },
            {
              onSuccess: (data) => {
                toast.success('محصول به سبد اضافه شد')
                // console.log(data)
              },
            }
        );
    }
    
    const scrollSlider = (direction) => {
        if (!sliderRef.current) return;
        const scrollAmount = 300;
        if (direction === 'left') {
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }


    return (
        <div className='my-[72px] max-[480px]:my-0 bg-BgBlue max-[480px]:bg-transparent rounded-lg p-6 max-[480px]:px-0'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='border-2 border-white max-[480px]:border-BgBlue bg-white max-[480px]:bg-BgBlue w-6 h-2 rounded-sm'/>
                <Text className={`font-bold text-white max-[480px]:text-BgBlue text-lg`}>محصولات تخفیف‌دار</Text>
            </div>
            <div className='relative'>
                <button onClick={() => scrollSlider('left')} className='absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition max-[480px]:hidden'>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div ref={sliderRef} className='flex scroll-slider gap-[18px] max-[480px]:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-2 scroll-smooth'>
                    {data?.results?.slice(-20)?.map((item) => (
                        <CardShopProduct
                            key={item?.id}
                            onTapCard={() => handleCardClick(item?.id)}
                            paddingCard="10px"
                            borderCard="1px solid #ccc"
                            borderRadiusCard="8px"
                            colorCard="#ffffff"
                            imageCard={item?.image}
                            boxFitCard="contain"
                            width='180px'
                            product={item?.name}
                            price={`${item?.price?.toLocaleString('fa-IR')}`}
                            priceOffer={`${item?.discounted_price?.toLocaleString('fa-IR')}`}
                            style={{ fontSize: 16, color: "#333" }}
                            stylePrice={{ fontWeight: "bold", color: "green" }}
                            styleOffer={{ fontSize: 14, display: item?.discounted_price === 0 ? "none" : "block" }}
                            avatarButtonConfigCardShopProduct={{
                                onTap: () => {
                                    if (!accessToken) {
                                        handleClick(item)
                                        
                                    } else (
                                        handleAddToCart(item?.id)
                                    )
                                },
                                width: 40,
                                height: 40,
                                border: "1px solid transparent",
                                borderRadius: "8px",
                                icon: <img src={IconCardShopProduct} alt="" srcSet="" />, 
                                sizeIcon: 20,
                            }}
                        />                           
                    ))}  
                </div>
                <button onClick={() => scrollSlider('right')} className='absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 opacity-80 hover:opacity-100 transition max-[480px]:hidden'>
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
            </div>
        </div>
    )
}

export default ContentDiscount
