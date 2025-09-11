import React from 'react';

// Config Types (برای درک بهتر)
const RowTextConfigCardTransaction = ({ title, description, styleTitle, styleDescription }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...defaultTitleStyle, ...styleTitle }}>{title || 'knkj'}</span>
        <span style={{ ...defaultDescriptionStyle, ...styleDescription }}>{description || 'kbkjbk'}</span>
        </div>
    );
};

const RowTextCardTransactionStatus = ({
    titleStatus,
    descriptionStatus,
    styleTitleStatus,
    styleDescriptionStatus,
    colorStatus,
    }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ ...defaultTitleStyle, color: styleTitleStatus?.color || 'black', ...styleTitleStatus }}>
            {titleStatus || 'Status Title'}
        </span>
        <div
            style={{
            backgroundColor: colorStatus || 'bluegrey',
            borderRadius: 8,
            padding: '4px 16px',
            }}
        >
            <span style={{ color: styleDescriptionStatus?.color || 'white', fontSize: 14, ...styleDescriptionStatus }}>
            {descriptionStatus || 'Status Description'}
            </span>
        </div>
        </div>
    );
};

const ColumnTextCardTransactionDescription = ({ label, styleLabel, description, styleDescription }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            <div
            style={{
                height: 8,
                width: 16,
                backgroundColor: 'blue',
                borderRadius: 2,
                marginRight: 8,
            }}
            />
            <span style={{ fontWeight: 'bold', fontSize: 14, ...styleLabel }}>{label || 'dmkmd'}</span>
        </div>
        <span style={{ fontWeight: 'bold', fontSize: 14, ...styleDescription }}>{description || 'kdmk'}</span>
        </div>
    );
};

const CustomButtonCardTransaction = ({
    text,
    textColor,
    backgroundColor,
    borderRadius,
    border,
    onTap,
    height,
    style,
    }) => {
    return (
        <button
        onClick={onTap}
        style={{
            height: height || 40,
            backgroundColor: backgroundColor || 'rgba(0,0,0,0.15)',
            borderRadius: borderRadius || 8,
            border: border || '1px solid rgba(0,0,0,0.15)',
            color: textColor || 'black',
            fontWeight: 'bold',
            fontSize: 16,
            cursor: 'pointer',
            padding: '0 16px',
            ...style,
        }}
        >
        {text || 'دکمه'}
        </button>
    );
};

const CardTransaction = ({
    onTap,
    width,
    border,
    color,
    padding,
    borderRadiusExternal,
    borderRadiusInternal,
    marginExternal,
    marginInternal,
    rowTextConfigCardTransaction,
    rowTextConfigCardTransactionStatus,
    columnTextConfigCardTransactionDescription,
    customButtonConfigCardTransaction,
    status,
    }) => {
    const statusColors = {
        1: 'green',
        2: 'yellow',
        3: 'red',
    };
    const colorStatus = statusColors[status] || 'grey';

    return (
        <div
        onClick={onTap}
        style={{
            width: width || '100%',
            margin: marginExternal || 16,
            border: border || '1px solid black',
            borderRadius: borderRadiusExternal || 0,
            backgroundColor: 'transparent',
            cursor: onTap ? 'pointer' : 'default',
        }}
        >
        <div
            style={{
            margin: marginInternal || 16,
            padding: padding || 16,
            borderRadius: borderRadiusInternal || 0,
            backgroundColor: color || 'rgba(0,0,0,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <RowTextConfigCardTransaction {...rowTextConfigCardTransaction} />
            <div style={{ height: 8 }} />
            <RowTextConfigCardTransaction {...rowTextConfigCardTransaction} />
            <div style={{ height: 8 }} />
            <RowTextConfigCardTransaction {...rowTextConfigCardTransaction} />
            <div style={{ height: 8 }} />
            <RowTextCardTransactionStatus {...rowTextConfigCardTransactionStatus} colorStatus={colorStatus} />
            <div style={{ height: 8 }} />
            <ColumnTextCardTransactionDescription {...columnTextConfigCardTransactionDescription} />
            {status !== 3 && (
            <>
                <div style={{ height: 8 }} />
                <CustomButtonCardTransaction {...customButtonConfigCardTransaction} />
            </>
            )}
        </div>
        </div>
    );
};

// Default styles
const defaultTitleStyle = {
    color: '#444',
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const defaultDescriptionStyle = {
    color: '#444',
    fontSize: 14,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

export default CardTransaction;
