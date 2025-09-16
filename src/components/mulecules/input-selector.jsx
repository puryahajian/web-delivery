import { Description, Field, Label, Select } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

export default function InputSelector({itemOne, children, className, onChange,value}) {
  return (
    <div className={`w-full max-w-md px-4 ${className}`}>
      <Field>
        {/* <Label className="text-sm/6 font-medium text-white">Project statu</Label> */}
        {/* <Description className="text-sm/6 text-white/50">This will be visible to clients on the project.</Description> */}
        <div className="relative">
          <Select
            className={clsx(
              'mt-3 block w-full appearance-none rounded-lg border font-sans border-gray-500 outline-none bg-Gray1 px-3 py-3 text-sm/6 ',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
              // Make the text of each option black on Windows
              '*:text-black'
            )}
            onChange={onChange}
            value={value}
          >
            <option value="">{itemOne}</option>
            {/* <option value="paused">Paused</option>
            <option value="delayed">Delayed</option>
            <option value="canceled">Canceled</option> */}
            {children}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-4 left-3 size-4 !fill-black"
            aria-hidden="true"
          />
        </div>
      </Field>
    </div>
  )
}
