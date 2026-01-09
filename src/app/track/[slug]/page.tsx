'use client'

import WaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation'


const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const search = searchParams.get('audio')
    const { params } = props;

    console.log("search>>", search);
    console.log("searchParams>>", searchParams);
    console.log("params>>", params);

    return (
        <div>Detail Track Page
            <div>
                <WaveTrack />
            </div>
        </div>
    )
}

export default DetailTrackPage;