/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Visuels produit servis depuis le CDN Higgsfield le temps de la maquette.
    // À retirer une fois les fichiers déposés dans public/products/.
    remotePatterns: [
      { protocol: 'https', hostname: 'd8j0ntlcm91z4.cloudfront.net', pathname: '/**' },
    ],
  },
  async headers() {
    return [
      {
        // Les frames du hero sont immuables : on les met en cache un an.
        source: '/hero/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};
export default nextConfig;
