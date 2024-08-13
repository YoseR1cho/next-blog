/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"

const nextConfig = {
    reactStrictMode:false,
    productionBrowserSourceMaps:true,
    compress:true,
    experimental:{
        optimizePackageImports:['echarts','lodash','dayjs']
    }
};

export default withBundleAnalyzer({enabled:process.env.ANALYZE === 'true'})(nextConfig);
