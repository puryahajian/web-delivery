import React from 'react'
import IconSearch from '../../assets/image/Iconly/Light/Search.png'

function Input({className, placeholder, classIcon, value, onChange, inputMode, defaultValue}) {
    return (
        <div className="relative w-full">
            <span className={`absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 ${classIcon}`}>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width={16} 
                    height={16} 
                    viewBox="0 0 16 16">
                        <path 
                        fill="#374151" 
                        d="m11.271 11.978l3.872 3.873a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532c-2.73-2.73-7.17-2.73-9.898 0s-2.728 7.17 0 9.9a6.96 6.96 0 0 0 4.949 2.05a.5.5 0 0 0 0-1a5.96 5.96 0 0 1-4.242-1.757a6.01 6.01 0 0 1 0-8.486a6.004 6.004 0 0 1 8.484 0a6.01 6.01 0 0 1 0 8.486a.5.5 0 0 0 .034.738">
                        </path>
                </svg>
            </span>
            <input
                type="text"
                className={`${className} w-full h-12 border border-BorderGray placeholder:text-sm placeholder:text-BorderGray bg-Gray1 rounded-lg pr-14 outline-none`}
                placeholder={placeholder}
                value={value}
                inputMode={inputMode}
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    )
}

export default Input
