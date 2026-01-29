"use client";

import { motion } from "framer-motion";

export default function LoadingDiv() {
    return (
        <div className="relative w-full h-auto flex flex-col justify-center items-center">
            <motion.svg
                width="300"
                height="200"
                viewBox="0 0 300 200"
            >
                <motion.circle
                    cx="70"
                    cy="98"
                    r="18"
                    fill="#7a7a7a"
                    animate={{
                        translateY: ["0px", "-20px", "0px"],
                        transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    }}
                />
                <motion.rect
                    x="98"
                    y="80"
                    width="36"
                    height="36"
                    fill="#7a7a7a"
                    animate={{
                        translateY: ["0px", "-20px", "0px"],
                        transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.25 }
                    }}
                />
                <motion.polygon
                    points="142,116 163,80 185,116"
                    fill="#fb2c36"
                    animate={{
                        translateY: ["0px", "-20px", "0px"],
                        transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                />
            </motion.svg>
        </div>
    )
}