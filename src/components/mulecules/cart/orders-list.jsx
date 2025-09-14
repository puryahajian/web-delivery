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
import useGetCart from '../../../hooks/use-get-cart';
import usePostAddToCart from '../../../hooks/use-post-add-to-cart';


function OrdersList() {
    const {data} = useGetProfile();
    const {data: dataGetCart} = useGetCart();
    // console.log(dataGetCart)
    const { mutate } = usePostAddToCart();


    const handlePositive = (id, quantity) => {
        // console.log(id, quantity)
        mutate(
            { 
                
            },
            {
              onSuccess: (data) => {
                toast.success('محصول به سبد اضافه شد')
                // console.log(data)
              },
              onError: (err) => {
                console.log(err)

              }
            }
        );
    }

    const { cart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();
    const access = Cookies.get('access');

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
                            <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                            <Text className={`font-bold`}>آدرس شما</Text>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 mt-[9px]'>
                        <img src={Location} alt="" />
                        <Text className={`text-BorderGray`}>{!data?.address ? 'لطفاً آدرس را وارد کنید' : data?.address}</Text>
                    </div>
                </div>

                <div className='flex gap-2 items-center cursor-pointer' onClick={() => navigate('/profile')}>
                    <Text className={`text-red-500`}>ویرایش</Text>
                    <img src={Edit} alt="" />
                </div>
            </div>

            <hr className=' my-6 w-[93%] m-auto hidden max-[480px]:block'/>
            </>
        ) : (
            ''
        )}

        <div className='pl-6 max-[480px]:pl-0'>
            <div className='flex items-center gap-2 mb-4'>
                <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                <Text className={`font-bold text-BgBlue`}>لیست سفارش‌ها</Text>
            </div>

            <div className='grid gap-4'>
                {!access ? (
                    <>
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
                    </>
                ) : (
                    <>
                   {dataGetCart?.results?.map((order) => (
                        order?.items?.map((item) => (
                            <CardShopProductWallet2
                            key={item?.id}
                            onClick={() => navigate(`/product-detail/${item?.product?.id}`)}
                            imageCard={item?.product?.image}
                            product={item?.product?.name}
                            price={`${item?.product?.price?.toLocaleString('fa-IR')}`}
                            numberProduct={item?.quantity}
                            check={true}
                            avatarButtonConfigRemove={{ 
                                icon: item?.quantity === 1 ? (
                                    <img
                                        onClick={() => {
                                        removeFromCart(item?.product?.id)
                                        toast.success('محصول از سبد خرید حذف شد')
                                        }}
                                        src={Delete}
                                        alt=""
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                        <path fill="white" fillRule="evenodd" d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" clipRule="evenodd"></path>
                                    </svg>
                                ), 
                                onTap: () => {
                                    updateQuantity(item?.product?.id, item?.quantity - 1);
                                } 
                            }}
                            avatarButtonConfigAdd={{ 
                                icon: <img src={Plus}/>, 
                                onTap: () => {
                                    handlePositive(item?.product?.id, item?.quantity + 1);
                                }
                            }}
                            />
                        ))
                        ))}
                    </>
                )}
            </div>
            <div className='m-auto text-center mt-6'>
                {!access ? (
                    <>
                        {cart?.length === 0 ? (
                            <>
                                <img src={NotData} className='w-32 m-auto mb-6' alt="" srcset="" />
                                <Text>سبد خرید شما خالی است</Text>
                            </>
                        ) : (
                            ''
                        )}
                    </>
                ) : (
                    <>
                        {dataGetCart?.count === 0 ? (
                            <>
                            <img src={NotData} className='w-32 m-auto mb-6' alt="" srcset="" />
                            <Text>سبد خرید شما خالی است</Text>
                            </>
                        ) : (
                            ''
                        )}
                    </>
                )}
            </div>
        </div>
        </>
    )
}

export default OrdersList
