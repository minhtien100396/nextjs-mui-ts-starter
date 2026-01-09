'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWaveSurfer } from '@/utils/customHook'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = (props: any) => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const optionsMemo = useMemo(() => {
        return {
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
        }
    }, [])

    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);

    useEffect(() => {
        if (!wavesurfer) {
            return
        }
        setIsPlaying(false)
        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false))
        ]
        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer])

    return (
        <div ref={containerRef}>
            wave track
            <div>
                <button onClick={() => onPlayClick()}>
                    {isPlaying === true ? "Pause" : "Play"}
                </button>
            </div>
        </div>
    )
}


export default WaveTrack;