import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState } from "../atoms/songAtom";
import { isPlayingState } from "../atoms/songAtom";
import { ArrowsRightLeftIcon, ArrowUturnLeftIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon, PauseCircleIcon, BackwardIcon, ForwardIcon, SpeakerWaveIcon as SpeakerWaveFilledIcon } from "@heroicons/react/24/solid";


const Player = () => {
    const { data:session, status } = useSession()
    const spotifyApi = useSpotify()

    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50)

    const songInfo = useSongInfo()
    // console.log(songInfo)

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then(data => { 
                console.log("Now playing", data.body?.item?.id)
                setCurrentTrackId(data.body?.item?.id)
                
                spotifyApi.getMyCurrentPlaybackState().then(data => {
                    console.log("Now playing", data.body)
                    setIsPlaying(data.body?.is_playing)
                })
            })
        }
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                setIsPlaying(false)
            } else {
                spotifyApi.play ()
                setIsPlaying(false)
            }
        })
    }

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackIdState, spotifyApi, session])

    return ( 
        <div className='h-[10vh] bg-gradient-to-b from-app-theme to-gray-900 text-white flex items-center justify-between text-sm md:text-[1rem] px-2 md:px-8'>
            {/* left */}
            <div className='flex items-center space-x-4'>
                <Image 
                    width={40}
                    height={40}
                    className='object-cover' 
                    src={songInfo?.album.images?.[0]?.url} 
                    alt={``} 
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* center */}
            <div className='flex items-center justify-evenly space-x-3 md:space-x-4 lg:space-x-6'>
                <ArrowsRightLeftIcon className="player-button" />
                <BackwardIcon className="player-button md:h-8 md:w-8" />
                {isPlaying ? <PauseCircleIcon onClick={handlePlayPause} className="player-button h-[3rem] w-[3rem]" />
                :
                <PlayCircleIcon onClick={handlePlayPause} className="player-button h-[3rem] w-[3rem]" />}
                <ForwardIcon className="player-button md:h-8 md:w-8" />
                <ArrowUturnLeftIcon className="player-button" />
            </div>
            {/* right */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                <SpeakerWaveIcon className="player-button" />
                <input 
                    className="w-14 md:w-28"
                    type='range' 
                    min={0} 
                    max={100} 
                    onChange={e => setVolume(e.target.value)}
                />
                <SpeakerWaveFilledIcon className="player-button" />
            </div>
        </div>
    );
}
 
export default Player;