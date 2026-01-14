"use client";
import { useTrackContext } from "@/app/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
    const hasMounted = useHasMounted();

    const playerRef = useRef(null);

    const { currentTrack, setCurrentTrack } =
        useTrackContext() as ITrackContext;

    //@ts-ignore
    if (currentTrack.isPlaying === true) {
        //@ts-ignore
        playerRef?.current?.audio?.current?.play();
    } else {
        //@ts-ignore
        playerRef?.current?.audio?.current?.pause();
    }

    if (!hasMounted) {
        return <></>;
    }

    return (
        <div style={{ marginTop: 100 }}>
            <AppBar
                position="fixed"
                sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
            >
                <Container
                    sx={{
                        display: "flex",
                        gap: 10,
                        ".rhap_main": {
                            gap: "30px",
                        },
                    }}
                >
                    <AudioPlayer
                        ref={playerRef}
                        layout="horizontal-reverse"
                        src={`${process.env.NEXT_PUBLIC_BACKEND}/tracks/${currentTrack.trackUrl}`}
                        volume={0.5}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2",
                            width: "1000px",
                            justifyContent: "space-between",
                        }}
                        onPlay={() => {
                            setCurrentTrack({
                                ...currentTrack,
                                isPlaying: true,
                            });
                        }}
                        onPause={() => {
                            setCurrentTrack({
                                ...currentTrack,
                                isPlaying: false,
                            });
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "100",
                        }}
                    >
                        <div style={{ color: "#c3c3c3" }}>
                            {currentTrack.description}
                        </div>
                        <div
                            style={{
                                color: "black",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {currentTrack.title}
                        </div>
                    </div>
                </Container>
            </AppBar>
        </div>
    );
};

export default AppFooter;
