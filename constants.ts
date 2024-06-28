import { Metadata } from "next";

const title = "Mail Collector";
const description =
  "Developing Mail Collector";
const image =
  "/app/assets/Image1.png";

export const metaData: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title,
    description,
    url: "http://localhost:3000/",
    siteName: "Mail Collector",
    images: [{ url: image }],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: title,
    description: description,
    card: "summary_large_image",
    images: [image],
    creator: "@nabinkhair",
  },
};
