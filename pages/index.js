import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center'
import Player from '../components/Player'
import SideBar from '../components/SideBar'



export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify Clone | Eonsinde</title>
        <meta name="description" content="spotify clone with nextjs by olasinde enoch" />
        <meta name="keywords" content="spotify clone, spotify clone with nextjs, olasinde enoch's spotify clone, spotify with nextjs eonsinde" />
        <meta name="author" content="eonsinde" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='bg-[#0e0e0e] h-screen w-screen overflow-hidden'>
        <main className='flex'>
          <SideBar />
          <Center />
        </main>

        <section className='sticky bottom-0'>
          <Player />
        </section>
      </div>
    </>
  )
}

Home.auth = false

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}