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