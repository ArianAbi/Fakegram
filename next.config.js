/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    disable:
        process.env.NODE_ENV === "development"
    // disable is help to disable PWA in deployment mode
});

const nextConfig = withPWA({
    images: {
        domains: ['jjpewexacillcatitbra.supabase.co']
    },
    experimental: {
        serverActions: true
    },
})

module.exports = nextConfig
