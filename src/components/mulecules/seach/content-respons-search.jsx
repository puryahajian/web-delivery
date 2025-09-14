import React from 'react';
import useGetProduct from '../../../hooks/use-get-product';
import { CardShopProduct } from '../card-shop-product';
import IconCardShopProduct from '../../../assets/image/plus.png';
import { useNavigate } from 'react-router-dom';
import ResponseIcon from '../../../assets/image/undraw_searching_no1g.svg'
import ContentResponseSearch from './content-response-search';

function ContentResponsSearch({ search }) {
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetProduct(search);
    const handleCardClick = (id) => {
        navigate(`/product-detail/${id}`);
    };

    if (!search) {
        return <div className='w-full mt-11 flex justify-center'>
            <img src={ResponseIcon} className='w-[200px]' alt="" />
        </div>;
    }

    if (isLoading) {
        return <p className="text-center mt-12">در حال جستجو...</p>;
    }

    if (isError) {
        return <p className="text-center mt-12">خطا در دریافت اطلاعات</p>;
    }

    if (!data || data?.results?.length === 0) {
        return <p className="text-center mt-12">محصولی یافت نشد</p>;
    }

    return (
        <div className="flex gap-4 mt-2 items-center">
            {data.results.map((item) => (
                <ContentResponseSearch
                    key={item?.id}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 256 256"><path fill="#f15923" d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8"></path></svg>}
                    name={item?.name}
                    price={item.price?.toLocaleString("fa-IR")}
                    srcImage={item?.image}
                    onClick={(e) => {
                        e.preventDefault();
                        handleCardClick(item.id)
                    }}
                />
            ))}
        </div>
    );
}

export default ContentResponsSearch;
