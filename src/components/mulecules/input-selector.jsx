import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import React, { useState } from 'react'

export default function InputSelector({
  itemOne,
  children,
  className,
  onChange,
  value,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue) => {
    onChange?.(optionValue) // به والد مقدار بده
    setIsOpen(false)
  }

  return (
    <div className={clsx('w-full max-w-md px-4', className)}>
      <div
        className={clsx(
          'mt-3 w-full rounded-lg border font-sans border-gray-500 bg-Gray1 px-3 py-3 text-sm/6',
          'relative flex items-center justify-between',
          disabled
            ? 'cursor-not-allowed opacity-50'
            : 'cursor-pointer hover:shadow-sm transition'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>
          {value
            ? React.Children.toArray(children).find(
                (child) => child.props.value === value
              )?.props.children
            : itemOne}
        </span>
        <ChevronDownIcon
          className={`size-4 !fill-black transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </div>

      {/* لیست گزینه‌ها */}
      {isOpen && !disabled && (
        <ul className="relative z-50 w-full mt-1 max-h-[300px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
          <li
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer w-full"
            onClick={() => handleSelect('')}
          >
            {itemOne}
          </li>
          {React.Children.map(children, (child) => (
            <li
              key={child.props.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(child.props.value)}
            >
              {child.props.children}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
