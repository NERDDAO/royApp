import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { AppComponent as ScaffoldEthAppWithProviders } from "@/app/components/AppComponent";
import "@/app/globals.css";
import { MetaHeader } from "./components/aiu/MetaHeader";

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: {
        default: "Scaffold-ETH 2 App",
        template: "%s | Scaffold-ETH 2",
    },
    description: "Built with 🏗 Scaffold-ETH 2",
    openGraph: {
        title: {
            default: "Scaffold-ETH 2 App",
            template: "%s | Scaffold-ETH 2",
        },
        description: "Built with 🏗 Scaffold-ETH 2",
        images: [
            {
                url: imageUrl,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [imageUrl],
        title: {
            default: "Scaffold-ETH 2",
            template: "%s | Scaffold-ETH 2",
        },
        description: "Built with 🏗 Scaffold-ETH 2",
    },
    icons: {
        icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
    },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
    return (
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap" rel="stylesheet" />
            </head>
            <body>
                <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
            </body>
        </html>
    );
};

export default ScaffoldEthApp;
