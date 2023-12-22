"use client"

import Link from "next/link"
import {usePathname, useSearchParams} from "next/navigation"
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/outline';

export const generatePagination = (currentPage, totalPages) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({length: totalPages}, (_, i) => i + 1)
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, " ", totalPages - 1, totalPages]
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, " ", totalPages - 2, totalPages - 1, totalPages]
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        " ",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        " ",
        totalPages
    ]
}

export default function Pagination({totalPages}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const createPageURL = pageNumber => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePagination(currentPage, totalPages)

    return (
        <div style={{display:"inline-flex"}}>
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className={"pagination"}>
                {allPages.map((page, index) => {
                    let position
                    if (page === " ") position = "middle"

                    return (
                        <PaginationNumber
                            key={page}
                            href={createPageURL(page)}
                            page={page}
                            position={position}
                            isActive={currentPage === page}
                        />
                    )
                })}
            </div>

            <PaginationArrow
                direction="right"
                href={createPageURL(currentPage + 1)}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    )
}

function PaginationNumber({page, href, isActive, position}) {
    if (!isActive && position === "middle") return <div className={"pagination-spacer"}></div>

    return isActive || position === "middle" ? (
        <div className={"pagination-number pagination-isActive"}>{page}</div>
    ) : (
        <Link href={href} className={"pagination-number"}>{page}</Link>
    )
}

function PaginationArrow({href, direction, isDisabled}) {
    const icon =
        direction === "left" ? (
            <ArrowLeftIcon style={{width:"1.5rem"}}/>
        ) : (
            <ArrowRightIcon style={{width:"1.5rem"}}/>
        )

    return isDisabled ? (
        <div className={"pagination-arrow"}>{icon}</div>
    ) : (
        <Link href={href} className={"pagination-arrow"}>{icon}</Link>
    )
}
