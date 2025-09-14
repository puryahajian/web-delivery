import React, { useEffect } from 'react'
import TempBoxMain from '../../template/temp-box-main'
import TempHeader from '../../template/temp-header'
import TempFooter from '../../template/temp-footer'
import TempBoxWhite from '../../template/temp-box-white'
import ContentForm from './content-form'
import Text from '../../atoms/text'
import ContentMap from './content-map'
import { useState } from 'react';
import '../../../App.css'
import useGetOrders from '../../../hooks/use-get-orders'
import moment from 'moment-jalaali'
import useGetProfile from '../../../hooks/use-get-profile'
import { RiEdit2Fill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import DocumentIcon from '../../../assets/image/Iconly/Document.png'
import ArrowLeftIcon from '../../../assets/image/Iconly/Arrow - Left 2.png'
import ModalGeneral from '../modal-general'
import Input from '../../atoms/input'
import usePatchProfile from '../../../hooks/use-patch-profile'
import Mapp from './mapp'
import toast from 'react-hot-toast'
import Loading from '../../atoms/loading'
import ModalGeneralBottom from '../modal-general-bottom'
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom'
import IconInfo from '../../../assets/image/Iconly/file.png'
import IconSupport from '../../../assets/image/Iconly/support (1).png'


function MulProfile() {
    const {data} = useGetOrders();
    // console.log(data)
    const {mutate, isPending} = usePatchProfile();
    const [addressMapp, setAddressMapp] = useState("");
    const [addressPreview, setAddressPreview] = useState("");
    const {data: dataProfile} = useGetProfile();
    const [modalEditMobile, setModalEditMobile] = useState(false)
    const [modalEditLocationMobile, setModalEditLocationMobile] = useState(false)
    const [modalExitMobile, setModalExitMobile] = useState(false)
    const [name, setName] = useState();
    const [family, setFamily] = useState();
    const [address, setAddress] = useState(dataProfile?.address);
    const [addressLat, setAddressLat] = useState(null);
    const [addressLng, setAddressLng] = useState(null);
    const [location, setLocation] = useState(null);
    // console.log(location)
    const navigate = useNavigate()

    // اگر addressMapp تغییر کرد، مقدار input آدرس را با آن مقدار به‌روزرسانی کن
    useEffect(() => {
        if (addressPreview) {
            // نمایش آدرس به صورت رشته فارسی (مثلاً road, city, state, country)
            const addressString = [
                addressPreview.region,    // استان
                addressPreview.locality,  // شهر
                addressPreview.street,    // خیابان
                addressPreview.name  
            ].filter(Boolean).join('، ');
            setAddress(addressString);
            console.log(addressString)
        }
    }, [addressPreview]);

    // useEffect(() => {
    //     if (dataProfile) {
    //         if (dataProfile?.name) setName(dataProfile.name);
    //         if (dataProfile?.family) setFamily(dataProfile.family);
    //         if (dataProfile?.address) setAddress(dataProfile.address);
    //         if (dataProfile?.addressLat) setAddressLat(dataProfile.addressLat);
    //         if (dataProfile?.addressLng) setAddressLng(dataProfile.addressLng);
    //     }
    // }, [dataProfile]);

    const handleSuccess = () => {
        mutate(
            {
                name, address, addressLat, addressLng, family, location
            },
            {
                onSuccess: () => {
                    toast.success('پروفایل با موفقیت به‌روزرسانی شد')
                    setModalEditLocationMobile(false)
                    setModalEditMobile(false)
                }
            }
        );
    }

    const handleExit = () => {
        Cookies.remove('access');
        Cookies.remove('refresh');
        navigate('/')
    }

    const stateLabels = {
        0: "در انتظار",
        1: "پرداخت شد",
        2: "تایید شد",
        3: "رد شد",
        4: "در حال پردازش",
        5: "در حال بسته‌بندی",
        6: "در حال ارسال",
        7: "لغو شد",
        8: "تکمیل شد",
    };
    const stateColors = {
        0: "text-yellow-500",  // pending
        1: "text-blue-500",    // paid
        2: "text-green-600",   // accepted
        3: "text-red-600",     // rejected
        4: "text-orange-500",  // in progress
        5: "text-purple-500",  // packing
        6: "text-sky-500",     // delivering
        7: "text-gray-500",    // canceled
        8: "text-emerald-600", // completed
    };

    return (
        <div>
            <TempHeader/>
            
            {/* desktop */}
            <TempBoxMain className={`max-[480px]:hidden`}>
                <TempBoxWhite>
                    <div className='items-center gap-2 hidden max-[480px]:flex'>
                        <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                        <Text className={`font-bold !text-base`}>پروفایل</Text>
                    </div>
                    <div className='grid grid-cols-2 max-[480px]:mt-6'>
                        <ContentForm addressPreview={addressPreview} location={location}/>
                        <ContentMap setAddressPreview={setAddressPreview} setLocation={setLocation}/>
                    </div>
                </TempBoxWhite>

                {/* orders */}
                <TempBoxWhite className='mt-4'>
                    <div className='flex items-center gap-2 mb-4'>
                        <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                        <Text className='font-bold !text-base'>سفارش‌ها</Text>
                    </div>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full text-center border-separate border-spacing-y-3'>
                            <thead>
                                <tr className='text-gray-500 text-sm '>
                                    <th>ردیف</th>
                                    <th>سفارش</th>
                                    <th>کد سفارش</th>
                                    <th>قیمت</th>
                                    {/* <th>سفارش دهنده</th> */}
                                    <th>تاریخ و زمان</th>
                                    <th>وضعیت سفارش</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.results?.map((item, index) => (
                                    <tr key={item?.id} className={`bg-white border py-4 border-black rounded-lg `}>
                                        <td className='ns'>{index + 1}</td>
                                        <td>{item?.items?.map((n) => n?.product?.name)}</td>
                                        <td>{item?.order_code}</td>
                                        <td className='flex justify-center items-center'>{item?.final_price !== undefined ? Math.floor(item.final_price).toLocaleString('fa-IR') : ''} تومان</td>
                                        {/* <td>علی حاجیان</td> */}
                                        <td>
                                            {item?.created_at ? (
                                                <>
                                                    {moment(item.created_at).format('jYYYY/jMM/jDD')} <span className="text-gray-400">|</span> {moment(item.created_at).format('HH:mm')}
                                                </>
                                            ) : ''}
                                        </td>
                                        <td className={`${stateColors[item?.state] || "text-black"} font-bold ne`}>
                                            {stateLabels[item?.state] || "نامشخص"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TempBoxWhite>
                <TempFooter/>
            </TempBoxMain>
            
            {/* mobile */}
            <div className='border mt-20 mx-4 rounded-lg p-4 hidden max-[480px]:block'>
                <div className='flex justify-between items-center'>
                    <div>
                        <Text>{!dataProfile?.name ? 'بدون نام' : dataProfile?.name} {!dataProfile?.family ? '' : dataProfile?.family}</Text>
                        <Text className={`text-gray-400 mt-1`}>{dataProfile?.phone}</Text>
                    </div>

                    <div className='flex items-center gap-2' onClick={() => setModalEditMobile(true)}> 
                        <Text className={`!text-red-500`}>ویرایش</Text>
                        <RiEdit2Fill className='text-red-500 text-xl'/>
                    </div>
                </div>

                <hr className='my-4'/>

                <div>
                    <div className='flex items-center gap-2 mb-4'>
                        <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                        <Text className='font-bold !text-base'>آدرس</Text>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2'>
                            {/* <Text className={`text-gray-400 mt-1`}>{dataProfile?.phone}</Text> */}
                            <FaLocationDot/>
                            <Text>{address || dataProfile?.address || 'آدرس را وارد کنید'}</Text>
                        </div>

                        <div className='flex items-center gap-2' onClick={() => setModalEditLocationMobile(true)}> 
                            <Text className={`!text-red-500`}>ویرایش</Text>
                            <RiEdit2Fill className='text-red-500 text-xl'/>
                        </div>
                    </div>
                </div> 
            </div>

            <hr className='my-4 w-[83%] m-auto'/>
            
            <Link to="/transaction">
                <div className='border mx-4 rounded-lg p-4 hidden max-[480px]:flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img src={DocumentIcon} className='w-6 h-6' alt="" />
                        <Text>تراکنش‌های مالی</Text>
                    </div>

                    <img src={ArrowLeftIcon} alt="" />
                </div>
            </Link>

            <Link to="/about-us">
                <div className='border mx-4 rounded-lg p-4 hidden max-[480px]:flex justify-between items-center mt-4'>
                    <div className='flex gap-3 items-center'>
                        <img src={IconInfo} className='w-6 h-6' alt="" />
                        <Text>درباره ما</Text>
                    </div>

                    <img src={ArrowLeftIcon} alt="" />
                </div>
            </Link>

            <Link to="/content-us">
                <div className='border mx-4 rounded-lg p-4 hidden max-[480px]:flex justify-between items-center mt-4'>
                    <div className='flex gap-3 items-center'>
                        <img src={IconSupport} className='w-6 h-6' alt="" />
                        <Text>تماس با ما</Text>
                    </div>

                    <img src={ArrowLeftIcon} alt="" />
                </div>
            </Link>

            {/* btn exit */}
            <div className='fixed bottom-0 right-0 w-full p-2 hidden max-[480px]:block'>
                <div className='border border-red-500 mt-20 py-3 flex justify-center items-center rounded-lg' onClick={() => setModalExitMobile(true)}>
                    <Text className={`text-red-500 !font-bold`}>خروج از حساب</Text>
                </div>
            </div>

            {/* modal edit name & family */}
            <ModalGeneral
                close={() => setModalEditMobile(false)}
                isOpen={modalEditMobile}
                handleClose={() => setModalEditMobile(false)}
                onSuccess={handleSuccess}
                // Title="می‌خواهید خارج شوید؟"
                textAccept={isPending ? <Loading/> : 'ذخیره'}
                classBtns={`grid grid-cols-2 gap-2`}
                classModal={`w-[80%]`}
                classAccess={`py-4`}
                >
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                            <Text className={``}>نام</Text>
                        </div>
                        <Input
                            classIcon={`hidden`}
                            className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                            placeholder={`نام`}
                            defaultValue={dataProfile?.name}
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className='mt-4'>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 border-BorderCustom bg-BorderCustom w-6 h-2 rounded-sm'/>
                            <Text className={``}>نام خانوادگی</Text>
                        </div>
                        <Input
                            classIcon={`hidden`}
                            className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                            placeholder={`نام خانوادگی`}
                            defaultValue={dataProfile?.family}
                            name="family"
                            value={family}
                            onChange={(e) => setFamily(e.target.value)}
                        />
                    </div>
            </ModalGeneral>

            {/* modal edit location */}
            <ModalGeneral
                close={() => setModalEditLocationMobile(false)}
                isOpen={modalEditLocationMobile}
                handleClose={() => setModalEditLocationMobile(false)}
                onSuccess={handleSuccess}
                // Title="می‌خواهید خارج شوید؟"
                textAccept={isPending ? <Loading/> : 'ذخیره آدرس'}
                classCanceled={`hidden`}
                classAccess={`py-3 ${!address ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                classBtns={`grid grid-cols-1 gap-2`}
                classModal={`!w-[90%]`}
                >
                <div className='flex items-center gap-2 mb-2'>
                    <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                    <Text className={``}>لطفاً موقعیت جغرافیایی خود را وارد کنید</Text>
                </div>

                <Mapp setAddressPreview={setAddressPreview} setLocation={setLocation} />

                <div className='flex items-center gap-2 mt-4 mb-2'>
                    <div className='border-2 border-BorderBlue bg-BgBlue w-6 h-2 rounded-sm'/>
                    <Text className={``}>آدرس دقیق‌تری وارد کنید</Text>
                </div>

                <Input 
                    className={`w-full pr-2`} 
                    classIcon={`hidden`}
                    value={address}
                    // defaultValue={dataProfile?.address}
                    onChange={(e) => setAddress(e.target.value)}
                />

            </ModalGeneral>

            {/* modal exit */}
            <ModalGeneralBottom
                close={() => setModalExitMobile(false)}
                isOpen={modalExitMobile}
                handleClose={() => setModalExitMobile(false)}
                onSuccess={handleExit}
                Title="می‌خواهید خارج شوید؟"
                textAccept={isPending ? <Loading/> : 'خروج'}
                classBtns={`grid grid-cols-1 gap-2`}
                >
            </ModalGeneralBottom>

        </div>
    )
}

export default MulProfile
