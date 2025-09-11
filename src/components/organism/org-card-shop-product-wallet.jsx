import React from 'react'
import { CardShopProductWallet } from '../mulecules/card-shop-product-wallet'

function OrgCardShopProductWallet() {
    return (
        <div>
            <CardShopProductWallet
                onClickCard={() => alert("کلیک روی کارت!")}
                paddingCard="12px"
                borderCard="2px solid #333"
                borderRadiusCard={10}
                backgroundColorCard="#f9f9f9"
                product="کفش ورزشی"
                price="450,000 تومان"
                priceOffer="500,000 تومان"
                style={{ fontWeight: "bold" }}
                styleOffer={{ fontSize: "14px" }}
                avatarButtonConfig={{
                  onClick: () => alert("کلیک روی آواتار!"),
                  icon: "🛒",
                  backgroundColor: "#eee",
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  iconColor: "#333",
                }}
            />
        </div>
    )
}

export default OrgCardShopProductWallet
