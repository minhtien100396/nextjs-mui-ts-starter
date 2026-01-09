'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWaveSurfer } from '@/utils/customHook'





const WaveTrack = (props: any) => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const containerRef = useRef<HTMLDivElement>(null);
    const optionsMemo = useMemo(() => {
        return {
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
        }
    }, [])

    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);

    return (
        <div ref={containerRef}>
            wave track
        </div>
    )
}


export default WaveTrack;