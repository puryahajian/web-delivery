import React from 'react'
import TempBoxWhite from '../../template/temp-box-white'
import bg from '../../../assets/image/item-discount.png'
import Text from '../../atoms/text'
import Button from '../../atoms/button'
import IconCardShopProduct from '../../../assets/image/plus.png'
import useGetDetailProduct from '../../../hooks/use-get-detail-product'
import usePostAddToCart from '../../../hooks/use-post-add-to-cart'
import { useCart } from '../../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Delete from '../../../assets/image/Iconly/Bold/Delete.png'


function ContentProduct() {
    const {data} = useGetDetailProduct();
    // console.log(data)
    const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
    // console.log(cart)

    const handleClick = (data) => {
        addToCart(data)
        toast.success('به سبد خرید اضافه شد');
    }

    const getCartProductId = (item) => item.data?.data?.id ?? item.data?.id;

    // بررسی اینکه محصول در سبد هست یا نه
    const cartItem = cart.find(item => getCartProductId(item) === data?.data?.id);

   
    return (
        <TempBoxWhite>
            <div className='flex gap-12'>
                <img src={data?.data?.image} className='w-[424px] min-w-[424px] max-w-[424px] h-[464px] min-h-[464px] max-h-[464px] rounded-2xl object-cover' alt="" />
                <div className='w-full'>
                    <Text className={`font-bold text-lg`}>{data?.data?.name}</Text>

                    <Text className={`mt-4 h-[200px]`}>
                        {data?.data?.details}
                    </Text>

                    <div className='flex mt-8 gap-10'>
                        <div>
                            <Text>
                                ارتفاع : {data?.data?.height ? data?.data?.height : 'ندارد'}
                            </Text>
                        </div>
                        <div>
                            <Text>
                                عرض : {data?.data?.width ? data?.data?.width : 'ندارد'}
                            </Text>
                        </div>
                        <div>
                            <Text>
                                طول : {data?.data?.length ? data?.data?.length : 'ندارد'}
                            </Text>
                        </div>
                        <div>
                            <Text>
                                وزن : {data?.data?.weight ? data?.data?.weight : 'ندارد'}
                            </Text>
                        </div>
                    </div>

                    <div className='mt-[132px] flex justify-between items-center'>
                        <div className='flex gap-4 items-center'>
                            <div className="relative">
                                <Text className="text-lg">{data?.data?.price} تومان</Text>
                                <span className="absolute left-0 top-1/2 w-full h-[2px] bg-black rotate-[-10deg]"></span>
                            </div>
                            <Text className={`text-2xl font-bold text-red-500`}>{data?.data?.discounted_price} تومان</Text>
                        </div>

                            {cartItem ? (
                                <div className='flex gap-2 items-center'>
                                    <Button 
                                        onClick={() => updateQuantity(cartItem.data.id, cartItem.quantity - 1)}
                                        className="p-3 rounded-lg"
                                    >
                                        {cartItem.quantity === 1 ? (
                                            <img onClick={() => {
                                                removeFromCart(cartItem?.data?.data?.id)
                                                toast.success('محصول از سبد خرید حذف شد')
                                            }} src={Delete} alt="حذف" className="w-6 h-6" />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                                <path
                                                    fill="white"
                                                    fillRule="evenodd"
                                                    d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}   
                                    </Button>
                                    <Text className='px-2'>{cartItem.quantity}</Text>
                                    <Button 
                                        onClick={() =>  updateQuantity(cartItem.data.id, cartItem.quantity + 1)}
                                        className="p-3 px-[18px] rounded-lg"
                                    >
                                        +
                                    </Button>
                                </div>
                            ) : (
                                <Button onClick={() => handleClick(data)} className={`flex py-3 px-[22px] gap-4`}>
                                    <img src={IconCardShopProduct} alt="" />
                                    <Text className={`text-white`}>افزودن</Text>
                                </Button>
                            )}
                    </div>
                </div>
            </div>
        </TempBoxWhite>
    )
}

export default ContentProduct
