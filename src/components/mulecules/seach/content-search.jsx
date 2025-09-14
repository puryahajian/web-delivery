import React, { useState } from 'react';
import Text from '../../atoms/text';
import Button from '../../atoms/button';
import Input from '../../atoms/input';

function ContentSearch({ setSearch }) {
  const [search, setSearchInput] = useState('');

  return (
    <div className="text-center items-center justify-center">
      {/* <Text className="text-4xl mb-3 font-bold">بحث</Text>
      <Text>للعثور على المنتج المطلوب، اكتب اسم المنتج.</Text> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
        //   handleGetValue();
        }}
      >
        <div className="flex items-center relative w-full m-auto gap-3 border-b border-gray-400">
          {/* <Button type="submit" className=" bg-transparent"> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              className='absolute left-2 top-4 z-[1]'
              viewBox="0 0 16 16"
            >
              <path
                fill="#f15923"
                d="m11.271 11.978l3.872 3.873a.5.5 0 0 0 .708 0a.5.5 0 0 0 0-.708l-3.565-3.564c2.38-2.747 2.267-6.923-.342-9.532c-2.73-2.73-7.17-2.73-9.898 0s-2.728 7.17 0 9.9a6.96 6.96 0 0 0 4.949 2.05a.5.5 0 0 0 0-1a5.96 5.96 0 0 1-4.242-1.757a6.01 6.01 0 0 1 0-8.486a6.004 6.004 0 0 1 8.484 0a6.01 6.01 0 0 1 0 8.486a.5.5 0 0 0 .034.738"
              ></path>
            </svg>
          {/* </Button> */}
          <Input
            value={search}
            onChange={(e) => {
                setSearchInput(e.target.value)
                setSearch(search);
            }}
            placeholder="جستجوی محصول"
            classIcon={`hidden`}
            className={`pr-2 w-full bg-transparent border-none placeholder:text-gray-400`}
          />
        </div>
      </form>
    </div>
  );
}

export default ContentSearch;
