import React, { useState, useEffect, useMemo } from 'react';
import TempHeader from '../../template/temp-header';
import useGetCategory from '../../../hooks/use-get-category';
import useGetParentCategory from '../../../hooks/use-get-parent-category';
import ItemCategory from './item-category';
import InputSelector from '../input-selector';

function MulCategoryMobile() {
    const [selectedParentId, setSelectedParentId] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
    const [subCategories, setSubCategories] = useState([]);

    // دریافت دسته‌های اصلی
    const { data: parentCategories } = useGetCategory();

    // دریافت زیردسته‌های دسته اصلی و زیردسته‌ها
    const { data: parentSubCategories } = useGetParentCategory(selectedParentId);
    const { data: subSubCategories } = useGetParentCategory(selectedSubCategoryId);

    // ترکیب زیردسته‌ها با اولویت دسته اصلی
    useEffect(() => {
        let combined = [];
        if (parentSubCategories?.results) combined = [...parentSubCategories.results];
        if (subSubCategories?.results) combined = [...combined, ...subSubCategories.results];
        setSubCategories(combined);
    }, [parentSubCategories, subSubCategories]);

    // دسته‌های اصلی مرتب و بدون order صفر
    const mainCategoriesOrder = useMemo(
        () => parentCategories?.filter(item => item?.order !== 0) || [],
        [parentCategories]
    );
    // console.log(mainCategoriesOrder)

    // انتخاب دسته اصلی
    const handleParentChange = (e) => {
        const selectedId = e.target.value;
        setSelectedParentId(selectedId);
        setSelectedSubCategoryId(''); // ریست انتخاب زیردسته
    };

    // انتخاب زیردسته
    const handleSubCategoryChange = (e) => {
        setSelectedSubCategoryId(e.target.value);
    };

    return (
        <div>
            <TempHeader />

            <div className="fixed top-[60px] right-0 w-full pb-4 bg-white h-max">
                <InputSelector
                    itemOne="دسته بندی اصلی مورد نظر خود را انتخاب کنید"
                    value={selectedParentId}
                    onChange={handleParentChange}
                >
                    {mainCategoriesOrder.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </InputSelector>

                <InputSelector
                    className="mt-4"
                    itemOne="زیر دسته بندی مورد نظر خود را انتخاب کنید"
                    value={selectedSubCategoryId}
                    onChange={handleSubCategoryChange}
                    disabled={!subCategories.length}
                >
                    {subCategories.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </InputSelector>
            </div>

            <ItemCategory
                subCategories={subCategories}
                mainCategoriesOrder={mainCategoriesOrder}
            />
        </div>
    );
}

export default MulCategoryMobile;
