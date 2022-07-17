import '../styles/globals.css'
require('@solana/wallet-adapter-react-ui/styles.css')
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
