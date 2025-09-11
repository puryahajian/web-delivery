import React from 'react'
import Text from '../../atoms/text'
import Title from '../../atoms/title'
import useGetOption from '../../../hooks/use-get-option';

function ContentLeft() {
    const {data} = useGetOption();

    return (
        <div>
            <Title className={`!font-bold !text-lg mb-4`}>درباره ما</Title>
            <Text>
                {data?.results[0]?.about_us}
            </Text>
        </div>
    )
}

export default ContentLeft
