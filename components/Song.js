import Image from "next/image";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { convertMillisecsToStringTime } from "../lib/time";


const Song = ({ order, track }) => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const playSong = () => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri],
        })
    }

    return (
    <div 
        className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg transition-colors ease-in-out cursor-pointer'
        onClick={playSong}
    >
        <div className='flex items-center space-x-4'>
            <p>{order + 1}</p>
            <div>
                <Image 
                    className='object-cover' 
                    width={40}
                    height={40}
                    src={track.track.album.images[0].url} 
                    alt='track cover' 
                />
            </div>
            <div>
                <p className='text-white w-36 lg:w-72 truncate'>{track.track.name}</p>
                <p className="w-40">{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 lg:w-60 hidden md:inline">{track.track.album.name}</p>
            <p>{convertMillisecsToStringTime(track.track.duration_ms)}</p>
        </div>
    </div>);
}
 
export default Song;