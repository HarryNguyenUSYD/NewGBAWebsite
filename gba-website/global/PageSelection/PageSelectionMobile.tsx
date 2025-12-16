"use client";

import Link from "next/link";
import { IconType } from "react-icons";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { navFont } from "../fonts/fonts";
import { useRouter, useSearchParams } from "next/navigation";
import { PageSelectionProps } from "./consts";

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
            className={`size-8 rounded-full text-lg flex justify-center items-center
                ${(isCurrent) ? "bg-red-500 text-white": "bg-gray-200 text-black"} ${navFont.className}`}
            href={href}
            onClick={(e) => {
                e.preventDefault();
                props.setPage(props.page);
                router.push(href, { scroll: false });
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
        <Link
            href={href}
            className="relative size-6 rounded-full flex justify-center items-center
                bg-gray-200 text-black"
            onClick={(e) => {
                e.preventDefault();
                props.setPage(props.page + direction);
                router.push(href, { scroll: false });
            }}
            aria-current="page"
        >
            <Icon className="text-lg" />
        </Link>
    )
}

const PageSelectionBar = ({
    props
}: { props: PageSelectionProps }) => {
    return (
        <div className="w-full h-auto my-10 bg-white flex flex-row justify-center items-center gap-4">
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
