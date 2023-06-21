interface ChannelPageProps {
    params: {
        id: string
    }
}

export default function ChannelPage({ params }: ChannelPageProps) {
    return (
        <div className="">
            <h1 className="font-bold text-xl">Channel page</h1>
            <p>{params.id}</p>
        </div>
    )
}