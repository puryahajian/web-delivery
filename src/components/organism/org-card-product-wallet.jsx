import React from "react";
import { CardShopProductWallet } from "./CardShopProductWallet";

function OrgCardProductWallet() {
    return (
        <CardShopProductWallet
            product="کفش ورزشی"
            price="1,000,000 تومان"
            priceOffer="800,000 تومان"
            avatarButtonConfig={{
                onClick: () => alert("Avatar clicked!"),
                icon: "⭐",
                backgroundColor: "#eee",
                borderRadius: "50%",
            }}
            onClickCard={() => alert("Card clicked!")}
            paddingCard="16px"
            borderRadiusCard="12px"
            style={{ fontWeight: "bold", fontSize: 16 }}
            styleOffer={{ fontSize: 14 }}
        />
    );
}

export default OrgCardProductWallet;
