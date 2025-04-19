/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"

const nextConfig = {
    reactStrictMode:false,
    productionBrowserSourceMaps:true,
    compress:true,
    experimental:{
        optimizePackageImports:['echarts','lodash','dayjs']
    },
    webpack:(config)=>{
        // 启用css优化压缩
        config.optimization.minimizer.push(new CssMinimizerPlugin({
            parallel:true,
            test:/.+\.css$/
        }))
        config.optimization.minimize = true
        return config
    },
    images:{
        domains:['localhost','www.yoser1cho.top']
    }
};

export default withBundleAnalyzer({enabled:process.env.ANALYZE === 'true'})(nextConfig);
