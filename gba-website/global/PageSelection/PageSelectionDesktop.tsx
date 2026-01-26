"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { navFont } from "../fonts/fonts";
import { useRouter, useSearchParams } from "next/navigation";
import { PageSelectionProps } from "./consts";
import { scrollToTop } from "./utils";

const PageButton = ({
    isCurrent,
    props
} : { isCurrent?: boolean, props: PageSelectionProps }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const href = (() => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.set("page", String(props.page));
        return `/${props.title}?${sp.toString()}`;
    })();

    return (
        <Link
            className={`size-12 rounded-full text-2xl flex justify-center items-center
                ${(isCurrent) ? "bg-red-500 text-white": "bg-gray-200 text-black hover:bg-red-500 hover:text-white"}
                duration-100 ${navFont.className}`}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                props.setPage(props.page);
                router.push(href, { scroll: false });
                scrollToTop();
            }}
            aria-current="page"
        >
            {props.page}
        </Link>
    )
}

const MoveButton = ({
    Icon,
    direction,
    props
} : { Icon: IconType, direction: number, props: PageSelectionProps }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const href = (() => {
        const sp = new URLSearchParams(searchParams.toString());
        sp.set("page", String(props.page + direction));
        return `/${props.title}?${sp.toString()}`;
    })();

    return (
        <motion.a
            href={href}
            whileHover={"hover"}
            className={`relative size-10 rounded-full overflow-hidden
                bg-gray-200 text-black hover:bg-red-500 hover:text-white"} duration-100`}
            onClick={(e) => {
                e.preventDefault();
                props.setPage(props.page + direction);
                router.push(href, { scroll: false });
                scrollToTop();
            }}
            aria-current="page"
        >
            <motion.div
                className="absolute w-full h-full flex justify-center items-center"
                animate={{ x: 0 }}
                variants={{
                    hover: {
                        x: ["0", direction < 0 ? "-0.5rem" : "0.5rem", "0"],
                        transition: { duration: 0.5, ease: "easeInOut", repeat: Infinity }
                    }
                }}
            >
                <Icon className="text-2xl" />
            </motion.div>
        </motion.a>
    )
}

const PageSelectionBar = ({
    props
}: { props: PageSelectionProps }) => {
    return (
        <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-center gap-5">
            {props.page > 1 && <MoveButton
                props={props}
                Icon={MdOutlineKeyboardDoubleArrowLeft}
                direction={- props.page + 1}
            />}
            {props.page > 1 && <MoveButton
                props={props}
                Icon={MdOutlineKeyboardArrowLeft}
                direction={-1}
            />}
            {props.page - 3 >= 1 && <div className="text-2xl text-black">...</div>}
            {props.page - 2 >= 1 && <PageButton props={{...props, page: props.page - 2}} />}
            {props.page - 1 >= 1 && <PageButton props={{...props, page: props.page - 1}} />}
            <PageButton isCurrent props={props} />
            {props.page + 1 <= props.maxPage && <PageButton props={{...props, page: props.page + 1}} />}
            {props.page + 2 <= props.maxPage && <PageButton props={{...props, page: props.page + 2}} />}
            {props.page + 3 <= props.maxPage && <div className="text-2xl text-black">...</div>}
            {props.page < props.maxPage && <MoveButton
                props={props}
                Icon={MdOutlineKeyboardArrowRight}
                direction={1}
            />}
            {props.page < props.maxPage && <MoveButton
                props={props}
                Icon={MdOutlineKeyboardDoubleArrowRight}
                direction={props.maxPage - props.page}
            />}
        </div>
    )
}

export default function PageSelection({
    props,
    children
}: { props: PageSelectionProps, children: React.ReactNode }) {
    return (
        <>
            <PageSelectionBar props={props}></PageSelectionBar>
            {children}
            <PageSelectionBar props={props}></PageSelectionBar>
        </>
    )
}
