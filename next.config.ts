import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['drive.google.com','placehold.co'],
    dangerouslyAllowSVG:true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'placehold.co',
  //       port: '',
  //       pathname: '/**',
  //       search: '',
  //     },
  //     {
  //       protocol: 'https',
  //       hostname: 'drive.google.com',
  //       port: '',
  //       pathname: '/**',
  //       search: '',
  //     },

  //   ],
    // dangerouslyAllowSVG:true
  
};

export default nextConfig;
// images: {
//   remotePatterns: [
//   {
//      protocol: "https",
//      hostname: "**",
//    },
//   ],
// },