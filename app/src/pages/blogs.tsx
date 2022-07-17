import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { AllBlogs } from '../components/AllBlogs'
import { Main } from '../components/Common'
import { CreateBlog } from '../components/CreateBlog'
import { MakePost } from '../components/MakePost'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Solana Blog dApp</title>
        <meta name="description" content="A Blog dApp on Solana brought you by Berzan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <AllBlogs/>
      </Main>
    </>
  )
}

export default Home
