import { withSerwist } from "@serwist/turbopack";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "**",
      },
    ],
  },
};

export default withSerwist(nextConfig);
