import React from 'react'
import { CardShopProduct } from '../card-shop-product'
import ImgDiscount from '../../../assets/image/item-discount.png'
import IconCardShopProduct from '../../../assets/image/plus.png'
import useGetSubCategory from '../../../hooks/use-get-sub-category';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../../context/CartContext';

function ContentList({ search }) {
    const {data} = useGetSubCategory();
    // console.log(data)
    const { cart, addToCart } = useCart();
    // console.log(data)
    const filtered = data?.results?.filter(item =>
        item?.name?.toLowerCase().includes(search?.toLowerCase())
    );

    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/product-detail/${id}`);
    }

    const handleGetData = (item) => {
        addToCart(item)
        toast.success('به سبد خرید اضافه شد');
    }
    return (
        <div className='mt-4 grid grid-cols-4 max-[1200px]:grid-cols-3 max-[860px]:grid-cols-2  gap-[18px] '>
            {filtered?.map((item) => (
                <CardShopProduct
                    // width="200px"
                    onTapCard={() => handleCardClick(item?.id)}
                    paddingCard="10px"
                    borderCard="2px solid #E6E6E6"
                    borderRadiusCard={8}
                    colorCard="white"
                    borderRadiusImg="8px"
                    imageCard={item?.image}
                    boxFitCard="contain"
                    product={item?.name}
                    price={`${item?.price} ريال`}
                    priceOffer={`${item?.discounted_price} ريال`}
                    style={{ fontSize: 16, color: "#333" }}
                    stylePrice={{ fontWeight: "bold", color: "black" }}
                    styleOffer={{ fontSize: 14 }}
                    avatarButtonConfigCardShopProduct={{
                        onTap: () => handleGetData(item),
                        width: 40,
                        height: 40,
                        border: "1px solid transparent",
                        borderRadius: "16px",
                        icon: <img src={IconCardShopProduct} alt="" srcset="" />,
                        // colorIcon: "black",
                        sizeIcon: 20,
                    }}
                />
            ))}
        </div>
    )
}

export default ContentList
