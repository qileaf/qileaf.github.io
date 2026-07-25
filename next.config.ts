import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isUserSite = repository.toLowerCase() === "qileaf.github.io";
const basePath = process.env.GITHUB_ACTIONS && repository && !isUserSite
  ? `/${repository}`
  : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
