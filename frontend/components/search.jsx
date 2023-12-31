"use client"
import {usePathname, useRouter, useSearchParams} from "next/navigation"
import {useDebouncedCallback} from "use-debounce"
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';

export default function Search({placeholder, width}) {
    const searchParams = useSearchParams()
    const {replace} = useRouter()
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
        <div className={"search"} style={{width:width}}>
            <MagnifyingGlassIcon className={"search-icon"}/>
            <input className={"search-input"}
                placeholder={placeholder}
                onChange={e => {
                    handleSearch(e.target.value)
                }}
                defaultValue={searchParams.get("query")?.toString()}
            />
        </div>
    )
}
