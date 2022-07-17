import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Page } from '../components/Common'
import { TopBar } from '../components/TopBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <TopBar/>
      <Component {...pageProps} />
    </Page>
  )
}

export default MyApp
