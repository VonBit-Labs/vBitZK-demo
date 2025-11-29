import './globals.css'

export const metadata = {
  title: 'vBitZK Demo | Zero-Knowledge Beneficial Ownership',
  description: 'Prove beneficial ownership through recursive ZK proofs. 312 bytes. 180ms. $0.001.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
