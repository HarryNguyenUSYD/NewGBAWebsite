import { Dispatch, SetStateAction } from "react";

export const ITEMS_PER_PAGE = 10;

export type ClientsSearchProps = {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    order: string,
    setOrder: Dispatch<SetStateAction<string>>,
    handleSubmit: () => void
}