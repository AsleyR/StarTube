import Link from "next/link";
import SearchForm from "../(component)/SearchForm";

interface MetadataProps {
    searchParams: {
        search?: string
    }
}

export function generateMetadata({ searchParams }: MetadataProps) {
    const search = searchParams.search || "Search"

    return {
        'title': `${search} - StarTube`
    }
}

export default function ResultsPage() {
    return (
        <div className="">
            <h1 className="font-bold text-3xl">Results page</h1>
            <Link href={'/video/123ABC'}>Go to video: "123ABC"</Link>
        </div>
    )
}