import React, { useEffect, useState } from 'react'
import Text from '../../atoms/text'
import Input from '../../atoms/input'
import Button from '../../atoms/button'
import useGetProfile from '../../../hooks/use-get-profile'
import usePatchProfile from '../../../hooks/use-patch-profile'
import Loading from '../../atoms/loading'
import toast from 'react-hot-toast'

function ContentForm({ addressPreview , location}) {
    const { data } = useGetProfile();
    const { mutate, isPending } = usePatchProfile();
    const [name, setName] = useState('');
    const [family, setFamily] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const addressLat = addressPreview.latitude;
    const addressLng = addressPreview.longitude;

    useEffect(() => {
        if (data) {
            setName(data.name || '');
            setPhone(data.phone || '');
            setAddress(data.address || '');
            setFamily(data.family || '')
        }
    }, [data]);

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
        }
    }, [addressPreview]);

    const handleSubmit = (e) => {
        mutate(
            { name, phone, address, family ,location},
            {
                onSuccess: () => {
                    toast.success('پروفایل با موفقیت به‌روزرسانی شد')
                }
            }
        );
    };

    return (
        <div className='border-l border-BorderGray pl-6'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                            <Text>نام</Text>
                        </div>
                        <Input
                            classIcon={`hidden`}
                            className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                            placeholder={`نام`}
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                            <Text>نام خانوادگی</Text>
                        </div>
                        <Input
                            classIcon={`hidden`}
                            className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                            placeholder={`نام خانوادگی`}
                            name="family"
                            value={family}
                            onChange={(e) => setFamily(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-2 mt-4'>
                    <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                    <Text>شماره موبایل</Text>
                </div>
                <Input
                    classIcon={`hidden`}
                    className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                    placeholder={`شماره موبایل`}
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className='flex items-center gap-2 mt-4'>
                    <div className='border-2 border-BorderBlue bg-BorderBlue w-6 h-2 rounded-sm'/>
                    <Text>آدرس</Text>
                </div>
                <Input
                    classIcon={`hidden`}
                    className={`bg-transparent pr-5 placeholder:text-sm mt-[10px]`}
                    placeholder={`آدرس`}
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <Button onClick={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }} className={`mt-10 w-full py-4`}>
                    {isPending ? <Loading/> : 'به‌روزرسانی آدرس'}
                </Button>
            </form>
        </div>
    )
}

export default ContentForm
