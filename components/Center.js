import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import Image from "next/image";
import { shuffle } from "lodash";
import useSpotify from '../hooks/useSpotify';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { playlistIdState, playListState } from '../atoms/playlistAtoms';
import Songs from './Songs';


const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const { data:session, status } = useSession()
    const spotifyApi = useSpotify()

    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [currentPlayList, setCurrentPlaylist] = useRecoilState(playListState)

    // console.log(playlistId)

    // to shuffle colors randomly
    useEffect(() => {
        setColor(shuffle(colors).pop())

        spotifyApi
            .getPlaylist(playlistId)
            .then(data => setCurrentPlaylist(data.body))
            .catch(err => console.error(err))
    }, [playlistId])

    // console.log(currentPlayList)

    return (
        <section className='flex-grow text-white h-screen'>
            <header className={`relative h-[35vh] bg-gradient-to-b to-app-theme ${color}`}>
                <div className='absolute top-5 right-8'>
                    <div 
                        className='flex items-center bg-app-theme space-x-3 cursor-pointer rounded-full p-1 pr-2 opacity-90 hover:opacity-80 transition-all ease-in-out'
                        onClick={() => signOut()}
                    >
                        {
                            !(status === 'loading') ?
                            <>
                                <Image 
                                    className='rounded-full object-cover' 
                                    width={40}
                                    height={40}
                                    src={session?.user.image} 
                                    alt='spotify logo' 
                                />
                                <h2>{session?.user.name}</h2>
                                <ChevronDownIcon className='h-5 w-5' />
                            </>
                            :
                            <>Loading...</>
                        }
                    </div>
                </div>
                <main className={`h-full flex items-end space-x-7 p-8 text-white padding-8`}>
                    <Image 
                        width={200}
                        height={200}
                        className='object-cover' 
                        src={currentPlayList?.images?.[0]?.url} 
                        alt={`${currentPlayList?.name} cover`} 
                    />
                    <div>
                        <p className='text-[1rem]'>PLAYLIST</p>
                        <h1 className='text-xl md:text-3xl xl:text-5xl'>{currentPlayList?.name}</h1>
                    </div>
                </main>
            </header>
            <div className='h-[65vh] py-4 overflow-y-scroll scrollbar-hide'>
                <Songs />
            </div>
        </section>
    );
}
 
export default Center;