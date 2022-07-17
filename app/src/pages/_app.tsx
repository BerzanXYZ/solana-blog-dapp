import '../styles/globals.css'
import '../styles/styles.css'
import type { AppProps } from 'next/app'
import { Page } from '../components/Common'
import { TopBar } from '../components/TopBar'
import Wallet from '../context/Wallet'
import { ProgramProvider } from '../context/ProgramProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Wallet>
      <ProgramProvider>
        <Page>
          <TopBar/>
          <Component {...pageProps} />
        </Page>
      </ProgramProvider>
    </Wallet>
  )
}

export default MyApp
