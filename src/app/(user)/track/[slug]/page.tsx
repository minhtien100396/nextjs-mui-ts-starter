import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {

    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0].split("-")) as string[];
    const id = temp1[temp1.length - 1];

    // fetch data
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${id}`,
        method: "GET",
        nextOption: { cache: "no-store" },
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

const DetailTrackPage = async (props: any) => {
    const { params } = props;
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0].split("-")) as string[];
    const id = temp1[temp1.length - 1];
    console.log("params slug:", id);
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${id}`,
        method: "GET",
    });

    const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComments>>>(
        {
            url: `http://localhost:8000/api/v1/tracks/comments`,
            method: "POST",
            queryParams: {
                current: 1,
                pageSize: 100,
                trackId: id,
                sort: "-createdAt",
            },
            nextOption: { cache: "no-store" },
        }
    );

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
