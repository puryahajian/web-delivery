import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TempHeader from '../../template/temp-header';
import useGetCategory from '../../../hooks/use-get-category';
import useGetParentCategory from '../../../hooks/use-get-parent-category';
import ItemCategory from './item-category';
import InputSelector from '../input-selector';

// هوک سفارشی برای مدیریت درخواست‌های دسته‌بندی
const useCategoryData = () => {
    const [selectedParentId, setSelectedParentId] = useState('');
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('');
    
    // دریافت دسته‌های اصلی
    const { data: parentCategories, isLoading: isLoadingParent } = useGetCategory();
    
    // دریافت زیردسته‌ها - فقط یک درخواست API
    const { 
        data: categoryData, 
        isLoading: isLoadingCategories 
    } = useGetParentCategory(selectedSubCategoryId || selectedParentId, {
        enabled: !!selectedSubCategoryId || !!selectedParentId
    });

    // دسته‌های اصلی مرتب و بدون order صفر
    const mainCategoriesOrder = useMemo(() => {
        if (!parentCategories) return [];
        return parentCategories.filter(item => item?.order !== 0);
    }, [parentCategories]);

    // زیردسته‌های فعلی بر اساس انتخاب کاربر
    const currentSubCategories = useMemo(() => {
        if (!categoryData?.results) return [];
        return categoryData.results;
    }, [categoryData]);

    return {
        selectedParentId,
        setSelectedParentId,
        selectedSubCategoryId,
        setSelectedSubCategoryId,
        parentCategories,
        isLoadingParent,
        currentSubCategories,
        isLoadingCategories,
        mainCategoriesOrder
    };
};

function MulCategoryMobile() {
    const [isOpen, setIsOpen] = useState(false);
    
    // استفاده از هوک سفارشی برای مدیریت داده‌های دسته‌بندی
    const {
        selectedParentId,
        setSelectedParentId,
        selectedSubCategoryId,
        setSelectedSubCategoryId,
        parentCategories,
        isLoadingParent,
        currentSubCategories,
        isLoadingCategories,
        mainCategoriesOrder
    } = useCategoryData();

    // مدیریت انتخاب دسته اصلی
    const handleParentChange = useCallback((val) => {
        setSelectedParentId(val);
        setSelectedSubCategoryId('');
    }, [setSelectedParentId, setSelectedSubCategoryId]);

    // مدیریت انتخاب زیردسته
    const handleSubCategoryChange = useCallback((val) => {
        setSelectedSubCategoryId(val);
    }, [setSelectedSubCategoryId]);

    return (
        <div>
            <TempHeader />

            {/* فیلترهای ثابت در بالای صفحه */}
            <div className="fixed top-[60px] right-0 w-full pb-4 bg-white h-max">
                {/* انتخاب دسته اصلی */}
                <InputSelector
                    itemOne="دسته بندی اصلی مورد نظر خود را انتخاب کنید"
                    value={selectedParentId}
                    onChange={handleParentChange}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    loading={isLoadingParent}
                >
                    {mainCategoriesOrder.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </InputSelector>

                {/* انتخاب زیردسته (فقط وقتی دسته اصلی انتخاب شده باشد نمایش داده می‌شود) */}
                <InputSelector
                    className="mt-4"
                    itemOne={isLoadingCategories ? "در حال بارگذاری..." : "زیر دسته بندی مورد نظر خود را انتخاب کنید"}
                    value={selectedSubCategoryId}
                    onChange={handleSubCategoryChange}
                    disabled={!currentSubCategories.length || isLoadingCategories}
                    loading={isLoadingCategories}
                >
                    {currentSubCategories.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </InputSelector>
            </div>

            {/* نمایش دسته‌بندی‌ها */}
            <div >
                <ItemCategory
                    subCategories={currentSubCategories}
                    mainCategoriesOrder={mainCategoriesOrder}
                    isLoading={isLoadingParent}
                />
            </div>
        </div>
    );
}

export default React.memo(MulCategoryMobile);