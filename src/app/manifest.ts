// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Globalsped Internationale Logistik Solutions',
    short_name: 'Globalsped',
    description: 'Globalsped Internation Logistik Website',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon/gsboicon-192x192.png', // Pfad zu Ihrem Icon im public-Ordner
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
