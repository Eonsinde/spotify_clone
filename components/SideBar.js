import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';
import { HomeIcon, MagnifyingGlassIcon, PlusCircleIcon, RssIcon, Square3Stack3DIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import useSpotify from '../hooks/useSpotify';
import { playlistIdState } from '../atoms/playlistAtoms';
import SpotifyLogo from './SpotifyLogo';



const SideBar = () => {
    const spotifyApi = useSpotify()
    const { data: session } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playListId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        // request playlists from spotify
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then(data => { setPlaylists(data.body.items) })
        }

    }, [session, spotifyApi])

    return ( 
        <div className='text-gray-500 p-5 text-sm md:text-md lg:text-lg border-r border-gray-900 overflow-y-scroll h-[90vh] sm:basis-[12rem] md:basis-[13rem] lg:basis-[18rem] hidden md:inline-flex scrollbar-hide'>
            <div className='space-y-6 basis-full'>
                <div>
                    <SpotifyLogo className='text-white h-[40px]' />
                </div>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HomeIcon className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <MagnifyingGlassIcon className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <Square3Stack3DIcon className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] w-full border-gray-900' />

                <button className='flex items-center space-x-2 hover:text-white'>
                    <PlusCircleIcon className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {/* Render custom playlists */}
                {playlists.map((playlist, index) => (
                    <p 
                        key={index} 
                        className='cursor-pointer hover:text-white'
                        onClick={() => setPlaylistId(playlist.id)}
                    >
                        {playlist.name[0].toUpperCase() + playlist.name.slice(1, playlist.name.length) }
                    </p>
                ))}
            </div>
        </div>
    );
}
 
export default SideBar;