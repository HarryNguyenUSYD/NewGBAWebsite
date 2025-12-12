"use client";

import { useState } from "react";
import { GoDotFill, GoDot } from "react-icons/go";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectGallery({
    index,
    maxIndex,
    disableGallery
}: { index: number, maxIndex: number, disableGallery: () => void }) {
    const [currentIndex, setCurrentIndex] = useState(index);

    const nextIndex = () => {
        setCurrentIndex((currentIndex + 1) % maxIndex);
    }

    const prevIndex = () => {
        setCurrentIndex((currentIndex - 1 >= 0) ? currentIndex - 1 : maxIndex - 1);
    }

    return (
        <div className="fixed top-(--navbar-height) left-0 w-full h-[calc(100vh-var(--navbar-height))] backdrop-brightness-25
            flex flex-col justify-between items-center">
            <button
                className="absolute top-5 right-5 p-2 m-2 cursor-pointer z-20 border-4 border-white rounded-full
                    hover:text-red-500 hover:border-red-500 duration-150"
                onClick={disableGallery}
            >
                <ImCross className="text-2xl" />
            </button>
            <div className="w-full h-[80%] flex justify-center items-center">
                <button
                    className="absolute left-0 top-0 w-1/2 h-full opacity-0 hover:opacity-80
                        duration-150 cursor-pointer"
                    onClick={prevIndex}
                >
                    <div
                        className="absolute left-0 top-0 w-40 h-full flex
                            justify-center items-center bg-linear-to-r from-black to-transparent"
                        >
                        <FaChevronLeft className="text-white text-6xl" />
                    </div>
                </button>
                <Image
                    src={"/test/louisbg.png"}
                    width={938}
                    height={1440}
                    alt="Project Image"
                    className="w-full h-full object-contain"
                />
                <button
                    className="absolute right-0 top-0 w-1/2 h-full opacity-0 hover:opacity-80
                        duration-150 cursor-pointer"
                    onClick={nextIndex}
                >
                    <div
                        className="absolute right-0 top-0 w-40 h-full flex
                            justify-center items-center bg-linear-to-l from-black to-transparent"
                        >
                        <FaChevronRight className="text-white text-6xl" />
                    </div>
                </button>
            </div>
            <div className="relative w-full h-[20%] flex flex-col justify-between items-center">
                <div className="relative w-full h-[75%] overflow-hidden">
                    <motion.div
                        className="absolute top-0 w-auto h-full flex flex-row justify-start items-center gap-2 z-20 py-5"
                        animate={{ left: `calc(50vw - 2.75rem - ${currentIndex} * 5.5rem)` }}
                        transition={{ duration: 0.25 }}
                    >
                        {Array.from({ length: maxIndex }, (_, i) => (i + 1)).map((_, i) => (
                            <button
                                key={`mini_image_${i}`}
                                className={`w-20 h-full ${currentIndex == i ? "opacity-100 scale-120" : "opacity-50 scale-100"}
                                    duration-150 cursor-pointer`}
                                onClick={() => setCurrentIndex(i)}
                            >
                                {
                                    i % 2 == 0 ? (
                                        <Image
                                            src={"/test/diningbg.png"}
                                            width={4492}
                                            height={2995}
                                            alt="Project Image"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <Image
                                            src={"/test/louisbg.png"}
                                            width={938}
                                            height={1440}
                                            alt="Project Image"
                                            className="w-full h-full object-contain"
                                        />
                                    )
                                }
                            </button>
                        ))}
                    </motion.div>
                </div>
                <div className="w-full h-[25%] flex flex-row justify-center items-center gap-1">
                    {Array.from({ length: maxIndex }, (_, i) => (i + 1)).map((_, i) => (
                        <div
                            key={`index_pointer_${i}`}
                        >
                            {currentIndex == i ? <GoDotFill /> : <GoDot className="opacity-50" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}