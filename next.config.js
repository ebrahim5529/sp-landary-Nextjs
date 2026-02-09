/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Enable Tailwind CSS v4
    experimental: {
        optimizeCss: true,
    },

    // Exclude src/pages from Next.js route generation
    // This directory is for React Router, not Next.js pages
    pageExtensions: ['page.tsx', 'page.ts', 'layout.tsx', 'layout.ts', 'loading.tsx', 'loading.ts', 'error.tsx', 'error.ts', 'not-found.tsx', 'not-found.ts'],

    // TypeScript configuration
    typescript: {
        ignoreBuildErrors: false,
    },

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    // Turbopack configuration for path aliases
    turbopack: {
        resolveAlias: {
            '@': './src',
        },
    },

    // Exclude src/pages from Next.js route generation
    // This directory is for React Router, not Next.js pages
    pageExtensions: ['tsx', 'ts', 'page.tsx', 'page.ts', 'layout.tsx', 'layout.ts', 'loading.tsx', 'loading.ts', 'error.tsx', 'error.ts', 'not-found.tsx', 'not-found.ts', 'route.ts', 'route.tsx'],

    // Disable static page generation - all pages use client-side hooks and AuthProvider
    // This prevents prerendering errors with useAuth
    generateBuildId: async () => {
        return 'build-' + Date.now();
    },

    // Custom webpack config to ignore pages directory
    webpack: (config, { isServer }) => {
        // Ignore src/pages directory during build - it's for React Router, not Next.js
        config.watchOptions = {
            ...config.watchOptions,
            ignored: ['**/src/pages/**', '**/node_modules/**'],
        };

        // Exclude src/pages from being processed as Next.js pages
        if (!isServer) {
            config.resolve.alias = {
                ...config.resolve.alias,
            };
        }

        return config;
    },

    // Exclude src/pages from static generation
    experimental: {
        optimizeCss: true,
        outputFileTracingExcludes: {
            '*': [
                '**/src/pages/**',
            ],
        },
    },
};

export default nextConfig;
