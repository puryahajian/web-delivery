import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/16/solid'
import Text from '../atoms/text'

function DropDownMenu({ buttonMenu, buttonTop, buttonbottom, text, onClickEdit, onClickExit, classText }) {
    return (
        <div className='relative mt-2'>
            <Menu>
                {({ open, close }) => (
                    <>
                        <MenuButton className="inline-flex items-center gap-2 focus:outline-none">
                            {buttonMenu}
                            <Text className={`text-gray-500 ${classText}`}>{text}</Text>
                        </MenuButton>

                        {open && (
                            <div
                                className="fixed inset-0 z-[20] bg-black/40 backdrop-blur-sm"
                                onClick={close}
                            />
                        )}

                        <MenuItems className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-gray-200 bg-white p-1 shadow-lg z-[25] focus:outline-none">
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={onClickEdit}
                                        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-500 ${
                                            active ? 'bg-gray-100' : ''
                                        }`}
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                        {buttonTop}
                                    </button>
                                )}
                            </MenuItem>
                            <div className="my-1 h-px bg-gray-200 max-[480px]:hidden" />
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={onClickExit}
                                        className={`group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-500 max-[480px]:hidden ${
                                            active ? 'bg-gray-100' : ''
                                        }`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                        {buttonbottom}
                                    </button>
                                )}
                            </MenuItem>
                        </MenuItems>
                    </>
                )}
            </Menu>
        </div>
    )
}

export default DropDownMenu
