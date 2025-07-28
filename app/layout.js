import './globals.css'
import Navbar from '../components/layout/Navbar'

export const metadata = {
  title: 'Zero Earth - Let every carbon tell a good story',
  description: 'Interactive carbon storytelling platform with innovative solutions for sustainable impact',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
} 