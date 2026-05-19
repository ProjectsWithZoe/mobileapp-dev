import { Instrument_Sans, Inter, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ErrorBoundary from '../src/components/ErrorBoundary'
import SentryInit from '../src/components/SentryInit'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
})

export const metadata = {
  title: 'Humble-UI — Prompt Engineering for AI UI Mockups',
  description: 'Generate structured, production-grade prompts for your AI code tool. Describe your app once — get a prompt that ships on the first try.',
  openGraph: {
    title: 'Humble-UI — Prompt Engineering for AI UI Mockups',
    description: 'Stop generating mediocre output. Humble-UI writes the prompt that makes your AI produce something worth shipping.',
    type: 'website',
    url: 'https://humble-ui.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Humble-UI — Prompt Engineering for AI UI Mockups',
    description: 'Stop generating mediocre output. Humble-UI writes the prompt that makes your AI produce something worth shipping.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Analytics />
        <SentryInit />
      </body>
    </html>
  )
}
