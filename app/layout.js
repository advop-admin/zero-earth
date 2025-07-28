import './globals.css'

export const metadata = {
  title: 'Interactive Dot Grid',
  description: 'An interactive dot grid with GSAP animations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 