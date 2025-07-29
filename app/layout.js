import './globals.css'
import Navbar from '../components/layout/Navbar'

export const metadata = {
  title: 'ZeroEarth - Decarbonisation Starts with Visibility',
  description: 'ZeroEarth creates verifiable climate solutions that reduce emissions at scale — across ecosystems, enterprises, and economies.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'ZeroEarth - Decarbonisation Starts with Visibility',
    description: 'ZeroEarth creates verifiable climate solutions that reduce emissions at scale — across ecosystems, enterprises, and economies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZeroEarth - Decarbonisation Starts with Visibility',
    description: 'ZeroEarth creates verifiable climate solutions that reduce emissions at scale — across ecosystems, enterprises, and economies.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#16a34a" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
} 