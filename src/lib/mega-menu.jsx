import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Text from "../components/atoms/text";
import "../App.css";
import { useNavigate } from "react-router-dom";
import useGetCategory from "../hooks/use-get-category";

// تابع ساخت درخت
const buildTree = (items) => {
    const map = {};
    const roots = [];

    items.forEach((item) => {
        map[item.id] = { ...item, children: [] };
    });

    items.forEach((item) => {
        if (item.parent) {
            map[item.parent]?.children.push(map[item.id]);
        } else {
            roots.push(map[item.id]);
        }
    });

    return roots;
};

function MegaMenu() {
    const { data, isLoading, error } = useGetCategory();
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();

    const fullTree = data?.length > 0 ? buildTree(data) : [];
    // فقط ریشه‌هایی که order !== 0 هستن نگه داریم
    const tree = fullTree.filter(cat => cat.order !== 0);

    // وقتی داده‌ها تغییر کرد، دسته اول را فعال کن
    useEffect(() => {
        if (tree?.length > 0 && !activeCategory) {
            setActiveCategory(tree[0]);
        }
    }, [tree, activeCategory]);

    const handleClick = (id) => {
        navigate(`/product-list/${id}`);
    };
    // console.log(tree)

    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
        <div
        className="relative"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        >

        {/* هدر */}
        <div className="container content-mega-menu flex items-center btn-megaMenu">
            <button className="pl-4 border-l border-Gray1 bg-transparent">
                <Text className={`text-gray-500`}>دسته‌بندی</Text>
            </button>
        </div>

        {/* مگامنو */}
        <AnimatePresence>
            {open && (
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                style={{
                width: "max-content",
                minWidth: "300px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                zIndex: "200",
                marginTop: "0",
                right: "0px",
                boxShadow: "0px 16px 38px -13px rgb(204, 204, 204)",
                }}
                className="absolute left-0 top-full bg-white shadow-xl border-t"
            >
                <div className="container mx-auto flex">
                {/* لیست دسته‌های اصلی */}
                <div
                    style={{
                    width: "200px",
                    borderBottomRightRadius: "8px",
                    borderTopRightRadius: "8px"
                    }}
                    className=" bg-Gray1 h-[400px] overflow-y-auto"
                >
                    {tree.map((cat) => (
                    <div
                        key={cat.id}
                        style={{ paddingRight: "24px", fontSize: "12px" , WebkitScrollSnapType: "none" }}
                        className={`py-3 cursor-pointer hover:bg-white transition scroll-slide ${
                        activeCategory?.id === cat.id ? "bg-white font-bold" : ""
                        }`}
                        onMouseEnter={() => setActiveCategory(cat)}
                    >
                        {cat.name}
                    </div>
                    ))}
                </div>

                {/* بخش زیرمجموعه‌ها */}
                <div className="p-6 ">
                    {activeCategory ? (
                    <>
                        {/* زیر دسته‌ها */}
                        <div className=" ml-3 grid grid-cols-4 gap-4">
                        {activeCategory.children.length > 0 ? (
                            activeCategory.children.map((child) => (
                            <div key={child?.id}>
                                <Text
                                    className={`text-sm text-gray-500 py-2 cursor-pointer`}
                                    onClick={() => handleClick(child?.id)}
                                    >
                                    {child?.name}
                                </Text>
                            </div>
                            ))
                        ) : (
                            <p className="text-gray-400 col-span-2 text-sm">
                                زیرمجموعه‌ای موجود نیست
                            </p>
                        )}
                        </div>
                    </>
                    ) : (
                    <p className="text-gray-400">یک دسته انتخاب کنید</p>
                    )}
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
}

export default MegaMenu;
