import React from "react";

export const AvatarButton = ({ config = {} }) => {
  const {
    onClick,
    width = 40,
    height = 40,
    border = "1px solid transparent",
    borderRadius = "0",
    backgroundColor = "#ca4f4f",
    icon,
    iconColor = "black",
    iconSize = 24,
  } = config;

  return (
    <button
      onClick={onClick}
      style={{
        width: width,
        height: height,
        border,
        borderRadius: borderRadius,
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {icon ? (
        typeof icon === "string" ? (
          <span
            style={{
              color: iconColor,
              fontSize: iconSize,
              lineHeight: 1,
            }}
          >
            {icon}
          </span>
        ) : (
          React.cloneElement(icon, {
            color: iconColor,
            size: iconSize,
          })
        )
      ) : (
        <span
          style={{
            color: iconColor,
            fontSize: iconSize,
          }}
        >
          ❄️
        </span>
      )}
    </button>
  );
};

export const CardShopProductWallet = ({
  onClickCard,
  paddingCard = "0",
  borderCard = "1px solid black",
  borderRadiusCard = "16px",
  backgroundColorCard = "white",
  imageCard,
  boxFitCard = "cover",
  product = "نام محصول",
  price = "قیمت",
  priceOffer,
  style,
  styleOffer,
  avatarButtonConfig,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        padding: paddingCard,
        border: borderCard,
        borderRadius: borderRadiusCard,
        backgroundColor: backgroundColorCard,
        cursor: onClickCard ? "pointer" : "default",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          borderRadius: "16px",
          height: 86,
          minWidth: 86,
        }}
      >
        <img
          src={
            imageCard ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18pOM_VW-tUWHYCqOIAFdwk4kzYvRi0-h-w&s"
          }
          onClick={onClickCard}
          alt={product}
          style={{
            width: "100%",
            height: "100%",
            objectFit: boxFitCard,
            borderRadius: "8px",
          }}
        />
      </div>
      <div
        style={{
          flex: 3,
          marginLeft: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            ...style,
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          onClick={onClickCard}

        >
          {product}
        </div>

        <hr
          style={{
            margin: "8px 0",
            borderColor: "#00000042",
            borderStyle: "solid",
            borderWidth: "1px 0 0 0",
            width: "100%",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            marginTop: 8,
          }}
        >
          <div>
            <div style={style}>{price}</div>
            {priceOffer && (
              <div
                style={{
                  ...styleOffer,
                  textDecoration: "line-through",
                  color: "red",
                }}
              >
                {priceOffer}
              </div>
            )}
          </div>
          <AvatarButton config={avatarButtonConfig} />
        </div>
      </div>
    </div>
  );
};

// نمونه استفاده

export default function App() {
  return (
    <div style={{ padding: 20 }}>
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
  );
}
