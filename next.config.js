/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        mySecret: 'secret',
        // Pass through env variables
        secondSecret: process.env.SECOND_SECRET,
    },
    publicRuntimeConfig: {
        apiBaseUrl: 'http://localhost:3001',
    },
}

module.exports = nextConfig
