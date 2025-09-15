import React from 'react'
import Text from '../../atoms/text'
import Title from '../../atoms/title'
import OrderItem from '../order-item';
import { CardShopProductWallet } from '../card-shop-product-wallet';
import { CardShopProductWallet2 } from '../cart-shop-product-wallet2';
import Plus from '../../../assets/image/plus.png'
import Delete from '../../../assets/image/Iconly/Bold/Delete.png'
import { useCart } from '../../../context/CartContext'
import toast from 'react-hot-toast';
import NotData from '../../../assets/image/undraw_no-data_ig65.svg'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import Edit from '../../../assets/image/Iconly/Bold/Edit.svg'
import Location from '../../../assets/image/Iconly/Bold/Location.png'
import useGetProfile from '../../../hooks/use-get-profile';


function OrdersList() {
    const {data} = useGetProfile();
    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const access = Cookies.get('access');

//    console.log(cart)
    return (
        <>
        <div className={`hidden ${!access ? 'max-[480px]:flex justify-between items-center mb-4' : 'hidden'}`}>
            <Title className={`text-gray-400`}>برای ادامه خرید باید وارد شوید</Title>

            <button onClick={() => navigate('/login')} className='text-BgCustom'>ورود</button>
        </div>

        <hr className={`hidden ${!access ? 'w-[95%] m-auto my-11' : 'hidden'}`}/>

        {/* address */}
        {access ? (
            <>
            <div className='hidden justify-between border p-4 rounded-lg items-center max-[480px]:flex'>
                <div>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                            <Text className={`font-bold`}>آدرس شما</Text>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 mt-[9px]'>
                        <img src={Location} alt="" />
                        <Text className={`text-BorderGray`}>{!data?.address ? 'لطفاً آدرس را وارد کنید' : data?.address}</Text>
                    </div>
                </div>

                <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate('/profile')}>
                    <Text className={`text-BgCustom`}>ویرایش</Text>
                    <img src={Edit} alt="" />
                </div>
            </div>

            <hr className='border border-Gray1 my-6 w-[93%] m-auto hidden max-[480px]:block'/>
            </>
        ) : (
            ''
        )}

        <div className='pl-6 max-[480px]:pl-0'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                <Text className={`font-bold`}>لیست سفارش‌ها</Text>
            </div>

            <div className='grid gap-4'>
                {cart.map((item, index) => (
                    <CardShopProductWallet2
                        onClick={() => navigate(`/product-detail/${item?.data?.data?.id ?? item?.data?.id}`)}
                        imageCard={item?.data?.data?.image ?? item?.data?.image}
                        product={item?.data?.data?.name ?? item?.data?.om_name}
                        price={`${item?.data?.data?.price ?? item?.data?.price.toLocaleString('fa-IR')}`}
                        numberProduct={item?.quantity}
                        check={true}
                        avatarButtonConfigRemove={{ 
                            icon: item?.quantity === 1 ? (
                                <img onClick={() => {
                                    removeFromCart(item?.data?.data?.id ?? item?.data?.id)
                                    toast.success('محصول از سبد خرید حذف شد')
                                }} src={Delete} alt="" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="white" fillRule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" clipRule="evenodd"></path></svg>
                            ), 
                            onTap: () => {
                                updateQuantity(item.data.id, item.quantity - 1);
                            } 
                        }}
                        avatarButtonConfigAdd={{ icon: <img src={Plus}/>, onTap: () => {
                            // if (item?.data?.id) {
                                updateQuantity(item.data.id, item.quantity + 1)
                            // }
                        }}}
                    />
                ))}
            </div>
            <div className='m-auto text-center mt-6'>
                {cart?.length === 0 ? (
                    <>
                        <img src={NotData} className='w-32 m-auto mb-6' alt="" srcset="" />
                        <Text>سبد خرید شما خالی است</Text>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
        </>
    )
}

export default OrdersList
