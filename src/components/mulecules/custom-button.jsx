import React from 'react';

const CustomButton = ({
    text = 'دکمه',
    textColor,
    backgroundColor,
    borderRadius,
    border,
    onTap,
    height = 40,
    width = 40,
    style,
    }) => {
    const combinedStyle = {
        width,
        height,
        backgroundColor: backgroundColor || 'rgba(0,0,0,0.26)',
        borderRadius: borderRadius || 8,
        border: border || '1px solid rgba(0,0,0,0.26)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: onTap ? 'pointer' : 'default',
        ...style,
    };

    const textStyle = {
        color: textColor || 'black',
        fontSize: 16,
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <div style={combinedStyle} onClick={onTap || (() => {})}>
            <span style={textStyle}>{text}</span>
        </div>
    );
};

export default CustomButton;
