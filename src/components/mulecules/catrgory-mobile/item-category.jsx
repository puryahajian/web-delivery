import React, { useMemo } from 'react'
import TempHeader from '../../template/temp-header'
import { useNavigate } from 'react-router-dom'
import AvatarButton from '../avatar-button'

function ItemCategory({ subCategories, mainCategoriesOrder }) {
    const navigate = useNavigate()

    // لیست نهایی دسته‌بندی‌ها (اگر subCategories بود همونو نشون بده، وگرنه دسته اصلی‌ها)
    const categoriesToShow = useMemo(() => {
        if (subCategories && subCategories.length > 0) return subCategories
        return mainCategoriesOrder || []
    }, [subCategories, mainCategoriesOrder])
    // console.log(categoriesToShow)

    const handleClick = (id) => {
        navigate(`/product-list/${id}`)
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-[14px] mt-[210px] mb-[90px] px-4">
                {categoriesToShow.map((item) => (
                    <AvatarButton
                        key={item?.id}
                        onTap={() => handleClick(item?.id)}
                        width="79px"
                        height="79px"
                        borderRadius="8px"
                        borderRadiusImage="4px"
                        boxFit="cover"
                        className="w-max h-max"
                        marginBottom="7px"
                        image={item?.image}
                        text={item?.name}
                        // انتخاب شده بودن رو مشخص کن
                        check={true}
                    />
                ))}
            </div>

            {categoriesToShow === undefined && 'خالی'}
        </div>
    )
}

export default React.memo(ItemCategory)
