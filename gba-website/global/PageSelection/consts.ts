import { Dispatch, SetStateAction } from "react"

export type PageSelectionProps = {
    page: number,
    setPage: Dispatch<SetStateAction<number>>,
    maxPage: number,
    title: string
}