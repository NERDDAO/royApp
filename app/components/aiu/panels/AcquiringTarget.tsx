import React, { useEffect, useRef } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { Spinner } from "@/app/components/aiu/assets/Spinner";
import { useGlobalState, useAppStore } from "@/app//store/store";


const AcquiringTarget: React.FC = () => {
    let naavi: any = null
    const store = useGlobalState(state => state.setSelectedDescription)

    const selectedTokenId = useGlobalState(state => state.selectedTokenId)
    const travelStatus = useAppStore(state => state.travelStatus)

    return (
        <>
            <div className="tokenid-display spaceship-display-screen mt-4">
                <div
                    className="screen-border"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        fontSize: "0.8rem",
                    }}
                >
                    {!selectedTokenId && travelStatus == "NoTarget" ? (
                        <div>
                            Select <br /> Token ID
                        </div>
                    ) : (
                        <div
                            className="cursor-pointer"
                            style={{
                                color: "white",
                                fontSize: "0.8rem",
                                fontWeight: "bold",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}

                        >
                            TOKEN ID
                            <div>
                                <p style={{ alignContent: "right", color: "white", fontSize: "0.8rem", fontWeight: "bold", margin: 0 }}>
                                    {" "}
                                    -|&nbsp;{4}&nbsp;|-
                                </p>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div>

                <div
                    className="screen-border acquiring-target-card 
                        spaceship-display-screen mt-4"
                    style={{
                        fontWeight: "bold",
                        alignContent: "center",
                        justifyContent: "center",
                        height: "100%",

                    }}
                >
                    <div
                        className="acquiring-target-circle spaceship-display-screen"

                    >
                        <Spinner width="100%" height="100%" />

                    </div>


                </div>

            </div>
        </>
    );
};

export default AcquiringTarget;

/*  <Toaster
                    containerClassName="w-[30%] h-[30%]"
                    containerStyle={{
                        top: "40%",
                        left: "30%",
                        right: 20,
                        bottom: 80,
                    }}
                    toastOptions={{
                        className: "hex-prompt",

                        success: {
                            duration: 6000,
                            style: {
                                background: "#1f2937",
                                color: "#fff",
                                padding: 5,
                            },
                            iconTheme: {
                                primary: "orange",
                                secondary: "black",
                            },

                        },
                    }}
                    position="bottom-left"
                >

                </Toaster>
*/
