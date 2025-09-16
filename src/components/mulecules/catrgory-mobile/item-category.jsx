import React from 'react'
import TempHeader from '../../template/temp-header'
import useGetCategory from '../../../hooks/use-get-category';
import AvatarButton from '../avatar-button';
import { useNavigate } from 'react-router-dom';

function ItemCategory() {
    const {data} = useGetCategory();
    const navigate = useNavigate()
    // console.log(data)
    const handleClick = (id) => {
        navigate(`/product-list/${id}`);
    }

    return (
        <div className='grid grid-cols-4 gap-[14px] mt-[76px] px-4'>
            {data?.map((item, index) => (
                <AvatarButton
                    key={item?.id || index}
                    onTap={() => handleClick(item?.id)}
                    width="79px"
                    className={`w-max h-max`}
                    height="79px"
                    borderRadius="8px"
                    borderRadiusImage="4px"
                    check={true}
                    image={item?.image}
                    boxFit="cover"
                    text={item?.name}
                    marginBottom="7px"
                />
            ))}
        </div>
    )
}

export default ItemCategory
