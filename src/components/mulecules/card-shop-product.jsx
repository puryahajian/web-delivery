import React from "react";
import PropTypes from "prop-types";

export function AvatarButtonCardShopProduct({ config = {} }) {
  const {
    onTap,
    width = 40,
    height = 40,
    border = "1px solid black",
    borderRadius = 0,
    icon,
    colorIcon = "black",
    sizeIcon = 24,
  } = config;

  return (
    <div
      onClick={onTap}
      style={{
        width,
        height,
        border,
        borderRadius,
        backgroundColor: "#ca4f4f",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: onTap ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {icon ? (
        typeof icon === "string" ? (
          <span style={{ color: colorIcon, fontSize: sizeIcon }}>{icon}</span>
        ) : (
          React.cloneElement(icon, { color: colorIcon, size: sizeIcon })
        )
      ) : (
        <span style={{ color: colorIcon, fontSize: sizeIcon }}>❄️</span>
      )}
    </div>
  );
}

AvatarButtonCardShopProduct.propTypes = {
  config: PropTypes.shape({
    onTap: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    border: PropTypes.string,
    borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    colorIcon: PropTypes.string,
    sizeIcon: PropTypes.number,
  }),
};

export function CardShopProduct({
  onTapCard,
  paddingCard = "0",
  borderCard = "1px solid black",
  borderRadiusCard = '8px',
  colorCard = "white",
  imageCard,
  boxFitCard = "cover",
  product = "نام محصول",
  price = "قیمت",
  priceOffer,
  borderRadiusImg = "4px",
  style,
  width,
  styleOffer,
  stylePrice,
  avatarButtonConfigCardShopProduct,
}) {
  return (
    <div
      
      style={{
        padding: paddingCard,
        border: borderCard,
        borderRadius: borderRadiusCard,
        backgroundColor: colorCard,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: onTapCard ? "pointer" : "default",
        width: width,
        minWidth: "150px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={onTapCard}
        style={{
          // maxWidth: "155px",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={
            imageCard ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18pOM_VW-tUWHYCqOIAFdwk4kzYvRi0-h-w&s"
          }
          alt={product}
          style={{
            width: "100%",
            height: "100%",
            objectFit: boxFitCard,
            borderRadius: borderRadiusImg,
          }}
        />
      </div>

      <div
        onClick={onTapCard}
        style={{
          marginTop: 8,
          fontSize: style?.fontSize || 14,
          color: style?.color || "black",
          fontWeight: style?.fontWeight,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
        }}
      >
        {product}
      </div>

      <hr
        style={{
          width: "80%",
          marginTop: 8,
          marginBottom: 8,
          borderColor: "rgba(0,0,0,0.15)",
        }}
      />

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AvatarButtonCardShopProduct config={avatarButtonConfigCardShopProduct} />
        <div style={{ textAlign: "left" }}>
          <div
            style={{
              ...stylePrice,
              color: stylePrice?.color || "black",
              fontSize: stylePrice?.fontSize || 14,
              textDecoration: "line-through"
            }}
            >
            {price}
          </div>
          {priceOffer && (
            <div
              style={{
                ...styleOffer,
                color: styleOffer?.color || "red",
                fontSize: styleOffer?.fontSize || 14,
              }}
              >
              {priceOffer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CardShopProduct.propTypes = {
  onTapCard: PropTypes.func,
  paddingCard: PropTypes.string,
  borderCard: PropTypes.string,
  borderRadiusCard: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colorCard: PropTypes.string,
  imageCard: PropTypes.string,
  boxFitCard: PropTypes.string,
  product: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  priceOffer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  styleOffer: PropTypes.object,
  stylePrice: PropTypes.object,
  avatarButtonConfigCardShopProduct: PropTypes.object,
};
