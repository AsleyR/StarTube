"use client"

import { SearchBarProps } from "@/app/(libs)";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchBar extends SearchBarProps {
    input: {
        search: string;
    }
}

export default function NavbarSearchBar({ placeholder }: SearchBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const search_value = searchParams?.get('search')

    const [input, setInput] = useState<SearchBar['input']>({
        search: search_value || ""
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`/results?search=${input.search}`)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: [e.target.value]
        })
    }

    const deleteInput = () => {
        setInput({
            "search": ""
        })
    }

    return (
        <form onSubmit={handleSubmit}
            className="flex gap-3 w-full border border-gray-700 text-gray-900 px-3 py-[6px] rounded-full"
        >
            <input
                className="w-full bg-inherit px-3 focus:outline-none rounded-full text-white"
                id="search-input"
                name="search"
                value={input.search}
                placeholder={placeholder || "Search"}
                onChange={handleChange}
                tabIndex={0}
            />
            {
                input.search !== "" ?
                    <button className="text-white hover:bg-gray-600/60 rounded-full w-6 duration-100"
                        type={'button'}
                        onClick={deleteInput}
                    >
                        <FontAwesomeIcon className="w-5" icon={faXmark} />
                    </button> : null
            }
        </form>
    )
}