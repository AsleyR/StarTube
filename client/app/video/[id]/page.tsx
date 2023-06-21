interface VideoPageProps {
    params: {
        id: string
    }
}

interface MetadataProps {
    params: {
        id?: string
    }
}

export function generateMetadata({ params }: MetadataProps) {
    const id = params.id || "Video"

    return {
        'title': `${id} - StarTube`
    }
}

export default function VideoPage({ params }: VideoPageProps) {

    return (
        <div className="grid">
            <h1 className="font-bold text-xl">Video page</h1>
            <p className="">{params.id}</p>
        </div>
    )
}