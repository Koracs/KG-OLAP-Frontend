"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }) {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const handleSearch = useDebouncedCallback(term => {
        console.log(`Searching... ${term}`)

        const params = new URLSearchParams(searchParams)

        params.set("page", "1")

        if (term) {
            params.set("query", term)
        } else {
            params.delete("query")
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return (
        <div>
            <label htmlFor="search">Search</label>
            <input
                placeholder={placeholder}
                onChange={e => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get("query")?.toString()}
            />
        </div>
    )
}
