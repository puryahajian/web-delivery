import React from "react";

export function AvatarButtonConfigCardShopProductWallet2({
  onTap,
  width = 40,
  height = 40,
  // border = "1px solid black",
  borderRadius = "8px",
  color = "#ca4f4f",
  icon = "❄",
  colorIcon = "black",
  sizeIcon = 24
}) {
  return (
    <div
      onClick={onTap || (() => {})}
      style={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // border,
        borderRadius,
        backgroundColor: color,
        cursor: "pointer",
        boxSizing: "border-box"
      }}
    >
      <span style={{ fontSize: sizeIcon, color: colorIcon }}>{icon}</span>
    </div>
  );
}

export function CardShopProductWallet2({
  onTapCard,
  paddingCard = 8,
  borderCard = "1px solid #E6E6E6",
  borderRadiusCard = "16px",
  colorCard = "white",
  imageCard = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18pOM_VW-tUWHYCqOIAFdwk4kzYvRi0-h-w&s",
  boxFitCard = "cover",
  product = "اسم المنتج",
  price = "السعر",
  numberProduct = 1,
  style = { color: "black", fontSize: 14 },
  check = false,
  avatarButtonConfigRemove,
  avatarButtonConfigAdd
}) {
  return (
    <div
      onClick={onTapCard || (() => {})}
      style={{
        display: "flex",
        alignItems: "center",
        padding: paddingCard,
        border: borderCard,
        borderRadius: 24,
        backgroundColor: colorCard,
        boxSizing: "border-box",
        cursor: "pointer",
        justifyContent: "space-between"
      }}
    >
      <div className="flex justify-between">
        <div
          style={{
            // flex: 1,
            width: "64px",
            height: "64px",

            borderRadius: borderRadiusCard,
            overflow: "hidden"
          }}
        >
          <img
            src={imageCard}
            alt={product}
            style={{
              width: "100%",
              height: "100%",
              objectFit: boxFitCard,
              display: "block"
            }}
          />
        </div>

        <div style={{ width: 8 }}></div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              ...style,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="font-bold font-sans text-sm"
          >
            {product}
          </span>
          <div style={{ height: 8 }}></div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.26)", margin: "0" }} />
          <div style={{ height: 8 }}></div>
          <span style={style}>{price}</span>
        </div>
      </div>

      <div style={{ width: 8 }}></div>

      {check ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}
        >
          {numberProduct === 1 ? (
            <AvatarButtonConfigCardShopProductWallet2 {...avatarButtonConfigRemove} />
          ) : (
            <AvatarButtonConfigCardShopProductWallet2 {...avatarButtonConfigRemove} />
          )}
          <span
            style={{
              ...style,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {numberProduct}
          </span>
          <AvatarButtonConfigCardShopProductWallet2 {...avatarButtonConfigAdd} />
        </div>
      ) : (
        <AvatarButtonConfigCardShopProductWallet2 {...avatarButtonConfigRemove} />
      )}
    </div>
  );
}
