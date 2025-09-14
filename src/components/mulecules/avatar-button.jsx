import React from "react";

const AvatarButton = ({
    onTap,
    width,
    height,
    className,
    padding = 8 || padding,
    border = "1px solid #BCBCBC" || border,
    borderRadius = 0,
    color = "white",
    text,
    marginBottom,
    // Image props
    paddingImage = 8,
    marginImage = "auto",
    borderRadiusImage,
    image ,
    boxFit = "cover",

    // Icon props
    icon = "❄", // default = snowflake (Icons.ac_unit مشابه)
    colorIcon = "black",
    sizeIcon = 24,

    check = false
    }) => {
    return (
        <div style={{ textAlign: "center"}} className={className}>
            <div
                onClick={onTap || (() => {})}
                style={{
                    width: width,
                    height: height,
                    padding: padding,
                    overflow: "hidden",
                    border: border,
                    borderRadius: borderRadius,
                    backgroundColor: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxSizing: "border-box",
                    // marginBottom: marginBottom,
                    margin: "auto",
                    textAlign: "center"
                }}
                >
                {check ? (
                    <div
                    style={{
                        padding: paddingImage,
                        margin: marginImage,
                        borderRadius: borderRadiusImage,
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${image})`,
                        backgroundSize: boxFit,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        boxSizing: "border-box",
                        
                    }}
                    ></div>
                ) : (
                    <span
                    style={{
                        fontSize: sizeIcon,
                        color: colorIcon
                    }}
                    >
                    {icon}
                    </span>
                )}
            </div>
            <span className={`text-sm block mt-2 w-[80px] truncate`}>
                {text}
            </span>
        </div>
    );
};

export default AvatarButton;
