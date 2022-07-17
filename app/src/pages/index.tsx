import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { Main } from '../components/Common'
import { CreateBlog } from '../components/CreateBlog'

const Home: NextPage = () => {
  const [blogCreated, setBlogCreated] = useState(false)

  return (
    <>
      <Head>
        <title>Solana Blog dApp</title>
        <meta name="description" content="A Blog dApp on Solana brought you by Berzan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {!blogCreated && <CreateBlog/>}
      </Main>
    </>
  )
}

export default Home
