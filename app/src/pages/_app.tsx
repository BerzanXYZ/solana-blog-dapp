import '../styles/globals.css'
require('@solana/wallet-adapter-react-ui/styles.css')
import type { AppProps } from 'next/app'
import { Page } from '../components/Common'
import { TopBar } from '../components/TopBar'
import Wallet from '../context/Wallet'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wallet>
      <Page>
        <TopBar/>
        <Component {...pageProps} />
      </Page>
    </Wallet>
  )
}

export default MyApp
