/** @type {import('next').NextConfig} */
// const nextConfig = {};
// const nextConfig = { reactStrictMode: false,  }
const nextConfig = {
  reactStrictMode: false,
  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     resolve: {alias: {'cldr$': 'cldrjs', 'cldr': 'cldrjs/dist/cldr'}}
  //   });

  //   return config;
  // },
  // experimental: {
  runtime: 'edge',
  // },
  images: {
    domains: ['fkqlrkbkiejnfrnbpcds.supabase.co'],
  },
}
export default nextConfig;
