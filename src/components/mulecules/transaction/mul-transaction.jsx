import React from "react";
import TempBoxMain from "../../template/temp-box-main";
import TempHeader from "../../template/temp-header";
import Text from "../../atoms/text";
import Rial from "../../../assets/image/Iconly/Iconly/Bold/Frame.png"

function MulTransaction() {
    return(
        <>
            <TempHeader/>

            <TempBoxMain className={`max-[480px]:mt-[70px]`}>
                <div className="border border-gray-300 p-2 rounded-lg">
                    <div className="bg-Gray1 rounded-lg p-4 grid gap-2">
                        <div className="flex justify-between items-center">
                            <Text>تاريخ</Text>
                            <Text>1234456</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text>السعر</Text>

                            <div className="flex items-center gap-1">
                                <Text>۲۰۰۰۰</Text>
                                تومان
                            </div>
                        </div>
                    </div>
                </div>
            </TempBoxMain>
        </>
    )
}

export default MulTransaction