import './globals.css'
import Navbar from '../components/layout/Navbar'

export const metadata = {
  title: 'Zero Earth - Let every carbon tell a good story',
  description: 'Interactive carbon storytelling platform with innovative solutions for sustainable impact',
  icons: {
    icon: [
      { url: '/assets/logos/logo-colored.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/logos/logo-colored.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/assets/logos/logo-colored.png',
    apple: '/assets/logos/logo-colored.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/logo-colored.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/logos/logo-colored.png" />
        <link rel="apple-touch-icon" href="/assets/logos/logo-colored.png" />
        <link rel="shortcut icon" href="/assets/logos/logo-colored.png" />
        <meta name="theme-color" content="#16a34a" />
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