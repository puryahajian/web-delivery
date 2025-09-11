import React from 'react';

const CustomTextField = ({
    label,
    hint,
    borderColor = '#808080', // خاکستری پیشفرض
    textStyle = {},
    value,
    onChange,
    obscureText = false,
    keyboardType = 'text',
    prefixIcon,
    suffixIcon,
    fillColor = 'transparent',
    filled = false,
    errorText,
    borderRadius = 8,
    height = 40,
    validator, // این رو می‌تونی جداگانه هندل کنی
    }) => {

    const inputType = obscureText ? 'password' : keyboardType;

    const containerStyle = {
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const labelStyle = {
        fontSize: 16,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 8,
    };

    const colorBoxStyle = {
        width: 16,
        height: 8,
        backgroundColor: 'blue',
        borderRadius: 2,
        marginRight: 8,
    };

    const inputStyle = {
        width: '100%',
        height: '100%',
        padding: '8px 12px',
        borderRadius,
        border: `1px solid ${borderColor}`,
        backgroundColor: filled ? fillColor : 'transparent',
        color: textStyle.color || 'black',
        fontSize: textStyle.fontSize || 14,
        fontWeight: textStyle.fontWeight || 'normal',
        boxSizing: 'border-box',
    };

    return (
        <div style={containerStyle}>
            {label && (
                <label style={labelStyle}>
                <div style={colorBoxStyle} />
                {label}
                </label>
            )}
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {prefixIcon && <span style={{ marginRight: 8 }}>{prefixIcon}</span>}
                <input
                type={inputType}
                placeholder={hint}
                value={value}
                onChange={e => onChange && onChange(e.target.value)}
                style={inputStyle}
                />
                {suffixIcon && <span style={{ marginLeft: 8 }}>{suffixIcon}</span>}
            </div>
            {errorText && (
                <span style={{ color: 'red', marginTop: 4, fontSize: 12 }}>
                {errorText}
                </span>
            )}
        </div>
    );
};

export default CustomTextField;
