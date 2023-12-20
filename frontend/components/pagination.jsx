"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export const generatePagination = (currentPage, totalPages) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, "...", totalPages - 1, totalPages]
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
    ]
}

export default function Pagination({ totalPages }) {
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
        <div className="inline-flex">
            <PaginationArrow
                direction="left"
                href={createPageURL(currentPage - 1)}
                isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
                {allPages.map((page, index) => {
                    let position

                    if (index === 0) position = "first"
                    if (index === allPages.length - 1) position = "last"
                    if (allPages.length === 1) position = "single"
                    if (page === "...") position = "middle"

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

function PaginationNumber({ page, href, isActive, position }) {
    return isActive || position === "middle" ? (
        <div>{page}</div>
    ) : (
        <Link href={href} >
            {page}
        </Link>
    )
}

function PaginationArrow({ href, direction, isDisabled }) {
    const icon =
        direction === "left" ? (
            "left"
        ) : (
            "right"
        )

    return isDisabled ? (
        <div>{icon}</div>
    ) : (
        <Link href={href}>
            {icon}
        </Link>
    )
}
