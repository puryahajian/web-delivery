import React from 'react';

const OrderButton = ({
    text = 'دکمه',
    textColor = 'white',
    backgroundColor = 'rgba(0,0,0,0.26)',
    borderRadius = 8,
    border = '1px solid rgba(0,0,0,0.26)',
    onTap,
    height = 56,
    width = '100%',
    style,
    leftIcon: LeftIcon,
    leftIconColor = 'black',
    leftIconSize = 24,
    rightIcon: RightIcon,
    rightIconColor = 'black',
    rightIconSize = 24,
    }) => {
    const containerStyle = {
        height,
        width,
        backgroundColor,
        borderRadius,
        border,
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: onTap ? 'pointer' : 'default',
        boxSizing: 'border-box',
    };

    const leftRowStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const textStyle = {
        color: textColor,
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
    };

    const iconStyle = (color, size) => ({
        color,
        fontSize: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    });

    return (
        <div style={containerStyle} onClick={onTap || (() => {})}>
        <div style={leftRowStyle}>
            {LeftIcon ? (
            <LeftIcon style={iconStyle(leftIconColor, leftIconSize)} />
            ) : (
            <DefaultLeftIcon style={iconStyle(leftIconColor, leftIconSize)} />
            )}
            <div style={{ width: 16 }} /> {/* فاصله بین آیکون و متن */}
            <span style={textStyle}>{text}</span>
        </div>
        {RightIcon ? (
            <RightIcon style={iconStyle(rightIconColor, rightIconSize)} />
        ) : (
            <DefaultRightIcon style={iconStyle(rightIconColor, rightIconSize)} />
        )}
        </div>
    );
};

// اگر بخوای، می‌تونی آیکون‌های پیش‌فرض رو اینجا تعریف کنی:
const DefaultLeftIcon = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M12 2L15 8H9L12 2Z" />
    </svg>
);

const DefaultRightIcon = (props) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        fill="currentColor"
        width="1em"
        height="1em"
    >
        <path d="M10 17l5-5-5-5v10z" />
    </svg>
);

export default OrderButton;
