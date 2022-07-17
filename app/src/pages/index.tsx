import type { NextPage } from 'next'
import Head from 'next/head'
import { Main } from '../components/Common'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Solana Blog dApp</title>
        <meta name="description" content="A Blog dApp on Solana brought you by Berzan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        Hello
      </Main>
    </>
  )
}

export default Home
