/** @type {import('next').NextConfig} */

import "./app/_lib/server-events.js";

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
