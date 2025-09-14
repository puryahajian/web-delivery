import React from 'react'
import Text from '../atoms/text'

function AvatarButtonHeader({className, src, text, classImg, children,onClick,classText}) {
    return (
        <div className={`${className}`} onClick={onClick}>
            <img src={src} className={`w-10 h-10 rounded-lg border border-BorderBlue ${classImg}`} alt="" srcset="" />
            {children}
            <Text className={`text-gray-500 ${classText}`}>{text}</Text>
        </div>
    )
}

export default AvatarButtonHeader
