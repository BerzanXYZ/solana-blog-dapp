import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Main } from '../components/Common'
import { CreateBlog } from '../components/CreateBlog'
import { MakePost } from '../components/MakePost'

const Home: NextPage = () => {
  const [blogCreated, setBlogCreated] = useState(false)

  useEffect(() => {
    setBlogCreated( !!(localStorage.getItem('blogCreated')) )
  }, [])
  
  useEffect(() => {
    if(!blogCreated) return
    localStorage.setItem('blogCreated', 'true')
  }, [blogCreated])

  return (
    <>
      <Head>
        <title>Solana Blog dApp</title>
        <meta name="description" content="A Blog dApp on Solana brought you by Berzan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        {!blogCreated ? <CreateBlog onSubmit={setBlogCreated}/> : <MakePost/>}
      </Main>
    </>
  )
}

export default Home
