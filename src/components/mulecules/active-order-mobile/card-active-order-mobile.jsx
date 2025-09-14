import React, { useState } from "react";
import Text from "../../atoms/text";
import ModalGeneralBottom from "../modal-general-bottom";
import Burron from '../../atoms/button'
import useGetOrders from "../../../hooks/use-get-orders";

function CardActiveOrderMobile ({setModalDetailOrder, setGetData}) {
    const {data} = useGetOrders();
    // const [getData , setGetData] = useState('');
    console.log(data)

    const stateLabels = {
        0: "در انتظار",
        1: "پرداخت شد",
        2: "تأیید شد",
        3: "رد شد",
        4: "در حال پردازش",
        5: "در حال بسته بندی",
        6: "در حال ارسال",
        7: "لغو شد",
        8: "تکمیل شد",
    };
    const stateColors = {
        0: "text-yellow-500",  // pending
        1: "text-blue-500",    // paid
        2: "text-green-600",   // accepted
        3: "text-red-600",     // rejected
        4: "text-orange-500",  // in progress
        5: "text-purple-500",  // packing
        6: "text-sky-500",     // delivering
        7: "text-gray-500",    // canceled
        8: "text-emerald-600", // completed
    };

    return(
        <div>
            {data?.results?.map((item) => (
                <div className="border rounded-lg p-2" 
                    onClick={() => {
                        setModalDetailOrder(true)
                        setGetData(item)
                    }}>
                    <div className="bg-Gray1 p-2 flex justify-between items-center">
                        <div className="grid gap-2">
                            <Text className={`!font-bold text-lg`}>سفارش: {item?.order_code}</Text>
                            <Text className={`text-gray-500 flex items-center gap-1`}>قیمت: <span className="text-BgCustom flex gap-1 items-center">{Number(item?.final_price).toLocaleString("fa-IR")} تومان</span></Text>
                            <Text className={`text-gray-500`}>وضعیت: <span className={stateColors[item?.state]}>{stateLabels[item?.state] || "نامشخص"}</span></Text>
                        </div>
                        <div>
                            <svg 
                                width="24" 
                                height="24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M7.37 10.869c.056-.058.27-.306.468-.51 1.165-1.283 4.204-3.383 5.795-4.024.242-.103.853-.321 1.179-.335.313 0 .61.072.895.218.355.204.64.525.795.904.1.263.256 1.05.256 1.064.156.861.242 2.26.242 3.806 0 1.473-.086 2.815-.213 3.689-.015.014-.17.992-.341 1.327a1.785 1.785 0 01-1.578.992h-.056c-.426-.015-1.321-.395-1.321-.409-1.505-.642-4.474-2.639-5.668-3.966 0 0-.336-.341-.482-.554A1.783 1.783 0 017 12.007c0-.423.128-.817.37-1.138z" 
                                        fill="#232323"/>
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardActiveOrderMobile;