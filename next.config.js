const { execSync } = require("node:child_process");

function getGitValue(command) {
  try {
    return execSync(command, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const siteCommitRef =
  process.env.COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.GITHUB_SHA ||
  getGitValue("git rev-parse HEAD");

const originUrl = getGitValue("git remote get-url origin");
const originMatch = originUrl.match(/github\.com[:/]([^/]+\/[^/.]+)(?:\.git)?$/);
const siteRepository =
  process.env.GITHUB_REPOSITORY ||
  process.env.SITE_REPOSITORY ||
  originMatch?.[1] ||
  "NSkogstad-AUS/nskog-portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    root: __dirname,
  },
  trailingSlash: true,
  images: { unoptimized: true }, // important if you use next/image
  env: {
    NEXT_PUBLIC_SITE_COMMIT_REF: siteCommitRef,
    NEXT_PUBLIC_SITE_REPOSITORY: siteRepository,
  },
};

module.exports = nextConfig;
