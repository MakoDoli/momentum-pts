/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "momentum.redberryinternship.ge",
        port: "",
        pathname: "/storage/employee-avatars/**",
      },
    ],
  },
};

export default nextConfig;
