import React from "react";
import TempBoxMain from "../../template/temp-box-main";
import TempHeader from "../../template/temp-header";
import Text from "../../atoms/text";
import useGetTransaction from "../../../hooks/use-get-transaction";
import moment from "moment-jalaali";

function MulTransaction() {
    const {data} = useGetTransaction();

    return(
        <>
            <TempHeader/>

            <TempBoxMain className={`max-[480px]:mt-[70px]`}>
                {data?.map((item) => (
                    <div className="border border-gray-300 p-2 rounded-lg">
                        <div className="bg-Gray1 rounded-lg p-4 grid gap-2">
                            <div className="flex justify-between items-center">
                                <Text>تاريخ</Text>
                                <Text>{moment(item?.timestamp).format("jYYYY/jMM/jDD - HH:mm")}</Text>
                            </div>
                            <div className="flex justify-between items-center">
                                <Text>السعر</Text>

                                <div className="flex items-center gap-1">
                                    <Text>{item?.amount.toLocaleString('fa-IR')} تومان</Text>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center mt-[170px] items-center">
                    <Text>{data === undefined && 'لم يتم العثور على المعاملة'}</Text>
                </div>
            </TempBoxMain>
        </>
    )
}

export default MulTransaction