import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = temp[0].split("-") as string[];
    const id = temp1[temp1.length - 1];

    // fetch data
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
        // nextOption: { cache: "no-store" },
    });

    return {
        title: res?.data?.title,
        description: res?.data?.description,
        openGraph: {
            title: "Hỏi Dân IT",
            description: "Beyond Your Coding Skills",
            type: "website",
            images: [
                `https://raw.githubusercontent.com/haryphamdev/sharing-host-files/refs/heads/master/detail-doctors/a1.jpg`,
            ],
        },
    };
}

export async function generateStaticParams() {
    return [
        { slug: "dreaming-of-you-6966f68e53bf17d60608df55.html" },
        { slug: "song-cho-het-doi-thanh-xuan-6966f68e53bf17d60608df45.html" },
        { slug: "xi-mang-pho-6966f68e53bf17d60608df43.html" },
    ];
}

const DetailTrackPage = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = temp[0].split("-") as string[];
    const id = temp1[temp1.length - 1];

    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
        method: "GET",
        nextOption: {
            next: {
                tags: [`track-by-id`],
            },
        },
    });

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComments>>>(
        {
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
            method: "POST",
            queryParams: {
                current: 1,
                pageSize: 100,
                trackId: id,
                sort: "-createdAt",
            },
            nextOption: {
                // next: {
                //     tags: [`track-by-id`],
                // },
            },
        }
    );

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    if (!res.data) {
        notFound();
    }

    return (
        <Container>
            <div>
                <WaveTrack
                    track={res?.data ?? null}
                    comments={res1?.data?.result ?? []}
                />
            </div>
        </Container>
    );
};

export default DetailTrackPage;
