import React, { useEffect, useRef, useState } from "react";
import { useGlobalState as useAppStore } from "@/app/store/store"
import { RainbowKitCustomConnectButton } from "@/app/components/scaffold-eth";

const SpaceshipInterface: React.FC = () => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const videoId = "SS2f-6wZElA";
    const playerRef = useRef<YT.Player | null>(null);
    let travelStatus = "trav";
    const toggleVideo = () => {
        setVideoPlaying(!videoPlaying);
    };

    const divStyle: React.CSSProperties = {
        pointerEvents: videoPlaying ? "auto" : "none",
        opacity: videoPlaying ? 0.8 : 0.25,
        zIndex: -1,
        left: "66.3%",
        top: "0%",
        width: "18.5%",
        height: "20%",
        position: "absolute",
        transform: "perspective(200px) rotateZ(-47deg) rotateY(-10deg) rotateX(-15deg)skewX(-15deg)skewY(10deg)",
    };

    useEffect(() => {
        if (travelStatus === "TargetAcquired") {
            setVideoPlaying(true);
        }
    }, [travelStatus]);
    const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=${!videoPlaying ? "0" : "1"
        }&mute=0&enablejsapi=1`;
    useEffect(() => {
        const loadYoutubeAPI = () => {
            const script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.async = true;
            script.defer = true;
            script.onload = () => {
                (window as any).YT.ready(() => {
                    console.log("YouTube API ready");
                });
            };
            document.body.appendChild(script);
        };

        loadYoutubeAPI();
    }, []);

    useEffect(() => {
        const onPlayerReady = (event: YT.PlayerEvent) => {
            event.target.setVolume(40);
        };

        const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
            if (event.data === YT.PlayerState.PLAYING && !videoPlaying) {
                setVideoPlaying(true);
            } else if (event.data === YT.PlayerState.PAUSED && videoPlaying) {
                setVideoPlaying(false);
            }
        };

        const createPlayer = () => {
            const newPlayer = new YT.Player("ytplayer", {
                videoId,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
            playerRef.current = newPlayer;
        };

        if ((window as any).YT) {
            createPlayer();
        } else {
            (window as any).onYouTubeIframeAPIReady = createPlayer;
        }
    }, []);
    return (
        <>
            <div style={divStyle} className="spaceship-display-screen">
                <iframe
                    className={`screen-border spaceship-interface ${videoPlaying ? "video-playing" : ""}`}
                    style={{
                        width: "90%",
                    }}
                    id="ytplayer"
                    src={iframeSrc}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <div
                    className="spaceship-interface"
                    style={{
                        background: "transparent",
                        zIndex: -2,
                        left: "0",
                        right: "60.3%",
                        transform:
                            "perspective(1000px) rotateZ(25deg) rotateX(45deg) rotateY(-24deg) translateX(15%) skewX(15deg) translateY(168%) scale(1.60)",
                    }}
                >
                </div>
            </div>

            <RainbowKitCustomConnectButton />
            <div
                className="screen-border spaceship-pannel spaceship-display-screen"
                style={{
                    position: "absolute",
                    height: "8%",
                    width: "4%",

                    fontSize: ".8rem",
                    display: "flex",
                    justifyContent: "center",
                    border: "1px solid #fff",
                    alignItems: "center",
                    top: "63%",
                    left: "63%",
                    marginRight: "5%",
                    padding: "1.5rem",
                    zIndex: 10,
                    transform: "rotateZ(8deg) rotateY(-30deg)skewX(5deg)skewY(-3deg)",
                    boxShadow: "0 0 10px 2px #fff",
                    animation: "pulse 15s infinite",
                }}
            >
                <button
                    onClick={toggleVideo}
                    className=""
                    style={{
                        background: "transparent",
                        border: "none",
                        opacity: 1,

                        fontSize: "0.8rem",
                        pointerEvents: "auto",
                    }}
                >
                    SPACE RADIO<br></br>
                    {videoPlaying ? "Pause" : "Play"}
                </button>
            </div>
        </>
    );
};

export default SpaceshipInterface;
