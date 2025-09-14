import React, { useState } from 'react'
import Button from '../../atoms/button';
import Loading from '../../atoms/loading';
import ImgLogin from '../../../assets/image/Layer-login.svg'
import usePostLogin from '../../../hooks/use-post-login';
import usePostVerify from '../../../hooks/use-post-verify';
import { useNavigate } from 'react-router-dom';
import Text from '../../atoms/text';
import Input from '../../atoms/input';
import Title from '../../atoms/title';
import OTPInput from 'react-otp-input'
import '../../../App.css'

function OrgLogin() {
    const { mutate, isPending } = usePostLogin();
    const { mutate: mutateVerify, isPending: isPendingVerify } = usePostVerify();
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState('');
    const [messageError, setMessageError] = useState('');
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    const handleSubmitLogin = () => {
        mutate(
            {
                userName
            },
            {
                onSuccess: () => {
                    setStep(2)
                },
                onError: (error) => {
                    setMessageError('نام کاربری یا رمز عبور نادرست است!')
                    console.log(error)
                },
            }
        )
    }

    const handleSubmitVerify = () => {
        // console.log(otp, userName)
        mutateVerify(
            {
                otp, userName
            },
            {
                onSuccess: () => {
                    navigate('/')
                },
                onError: (error) => {
                    setMessageError('نام کاربری یا رمز عبور نادرست است!')
                    console.log(error)
                },
            }
        )
    }

    return (
        <div className='flex flex-row h-dvh justify-center gap-32 max-[480px]:px-4 items-center max-[1024px]:flex-col-reverse bg-white'>
            <div className='max-[480px]:w-full'>
                <div className='text-center m-auto'>
                    <Title>سلام!</Title>
                    <Title className={`mt-4`}>لطفاً برای ورود شماره تلفن خود را وارد کنید</Title>
                    <div className='text-right mt-6'>
                        <Text className={`text-red-500 mb-2`}>{messageError}</Text>
                        <div  className='max-w-[325px] max-[580px]:max-w-[100%] w-[325px] max-[580px]:w-full max-[480px]:max-w-none '>
                            <form>
                                {step === 1 && (
                                    <>
                                        <Title>شماره تلفن</Title>
                                        <Input classIcon={`hidden`} inputMode={`numeric`} value={userName} onChange={(e) => setUserName(e.target.value)} className={`w-full bg-transparent border px-2 text-left mt-2 ${messageError ? 'border-red-500' : ''}`}/>
                                    </>
                                )}
                                {step === 2 && (
                                    <div>
                                        <Title className={`mt-4`}>کد تأیید</Title>
                                        <div className="relative mt-4">
                                            <OTPInput
                                                containerStyle="otp-container"
                                                value={otp}
                                                onChange={setOtp}
                                                numInputs={4}
                                                renderInput={(props) => <input {...props} inputMode='numeric'/>}
                                                inputStyle="otp-input"
                                                shouldAutoFocus
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 1 && (
                                    <>
                                    <Button className={`bg-BgCustom w-full min-w-[150px] max-[680px]:w-[100%] border border-BgCustom text-white mt-6 py-4`} 
                                         onClick={(e) =>{
                                             e.preventDefault()
                                            handleSubmitLogin()
                                        }}>
                                        {isPending ? <Loading/> : "دریافت کد تأیید"}
                                    </Button>
                                    <Button className={`bg-transparent w-full min-w-[150px] hidden max-[480px]:flex max-[480px]:justify-center max-[680px]:w-[100%] border border-BorderBlue !text-BorderBlue mt-6 py-4`} 
                                         onClick={(e) =>{
                                             e.preventDefault()
                                            navigate('/')
                                        }}>
                                            بازگشت
                                    </Button>
                                    </>
                                )}
                                {step === 2 && (
                                    <Button className={`bg-BgCustom w-full min-w-[150px] max-[680px]:w-[100%] border border-BgCustom text-white mt-6 py-4`} 
                                         onClick={(e) =>{
                                             e.preventDefault()
                                            handleSubmitVerify()
                                        }}>
                                        {isPendingVerify ? <Loading/> : "ورود"}
                                    </Button>
                                )}
                                                           
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <img src={ImgLogin} className='max-[680px]:w-[224px] max-[680px]:h-[200px] w-[400px] h-[400px]' alt="" />
            </div>
        </div>
    )
}

export default OrgLogin
