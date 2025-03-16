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
      {
        protocol: "https",
        hostname: "momentum.redberryinternship.ge",
        port: "",
        pathname: "/storage/priority-icons/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/9.x/thumbs/**",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
