import Head from 'next/head'
import Image from 'next/image'
import SideBar from '../components/SideBar'



export default function Home() {
  return (
    <div className='bg-[#0e0e0e] h-screen overflow-hidden'>
      {/* <Head>
        <title>Spotify</title>
        <meta name="description" content="Create by eonsinde" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <main className=''>
        {/* sidebar */}
        <SideBar />

        {/* viewport */}
        <div>
          <h1 className='text-3xl'>I{'`'}m The Viewport</h1>
        </div>
      </main>

      <div>
        {/* player */}
      </div>
    </div>
  )
}

Home.auth = false