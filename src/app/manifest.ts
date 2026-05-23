import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marveo",
    short_name: "Marveo",
    description: "Marveo help center and operational website platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#06060F",
    theme_color: "#06060F",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
