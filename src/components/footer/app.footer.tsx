"use client";
import { useTrackContext } from "@/app/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { Container, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
    const hasMounted = useHasMounted();

    const playerRef = useRef(null);

    const { currentTrack, setCurrentTrack } =
        useTrackContext() as ITrackContext;

    useEffect(() => {
        if (currentTrack?.isPlaying === false) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.pause();

        }
        if (currentTrack?.isPlaying === true) {
            //@ts-ignore
            playerRef?.current?.audio?.current?.play();

        }
    }, [currentTrack.isPlaying])

    if (!hasMounted) {
        return <></>;
    }

    return (
        <>
            {currentTrack._id &&
                <div style={{ marginTop: 10 }}>
                    <AppBar
                        position="fixed"
                        sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
                    >
                        <Container
                            disableGutters
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
                                <Tooltip title={currentTrack.description} arrow >
                                    <span
                                        style={{
                                            color: "#c3c3c3",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "inline-block",
                                            maxWidth: "200px", // chỉnh theo UI của bạn
                                            minWidth: 0
                                        }}
                                    >
                                        {currentTrack.description}
                                    </span>
                                </Tooltip>

                                <Tooltip title={currentTrack.title} arrow >
                                    <span
                                        style={{
                                            color: "black",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "inline-block",
                                            maxWidth: "200px", // chỉnh theo UI của bạn
                                            minWidth: 0
                                        }}
                                    >
                                        {currentTrack.title}
                                    </span>
                                </Tooltip>


                            </div>
                        </Container>
                    </AppBar>
                </div >
            }
        </>

    );
};

export default AppFooter;
