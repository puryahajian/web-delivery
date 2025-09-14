import React from 'react'
import Text from '../../atoms/text'
import Button from '../../atoms/button'
import IconCardShopProduct from '../../../assets/image/plus.png';

function ContentResponseSearch({
    srcImage,
    icon,   
    name ,
    price,
    onClick,
}) {
    return (
        <div className=' w-full p-2 flex justify-between cursor-pointer' onClick={onClick}>
            <div className='flex gap-2 items-center '>
                <img src={srcImage} className='w-14 h-14 rounded-lg' alt="" />
                <div>
                    <Text>{name}</Text>
                    <hr className='pb-1 mt-1'/>
                    <Text>{price} تومان</Text>
                </div>
            </div>
            <div className='flex justify-end items-center'>
                <div className={``}>
                    {icon}
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 512 512"><path fill="none" stroke="#f15923" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M388.364 242.764v178.691A42.547 42.547 0 0 1 345.818 464H90.546A42.544 42.544 0 0 1 48 421.455V166.182a42.543 42.543 0 0 1 42.546-42.546h178.69M464 180.364V48H331.636M216 296L464 48"></path></svg> */}
                </div>
            </div>
        </div>
    )
}

export default ContentResponseSearch
