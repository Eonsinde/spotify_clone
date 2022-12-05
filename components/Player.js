import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";


const Player = () => {
    const { data:session, status } = useSession()
    const spotifyApi = useSpotify()

    const [currentTrackId, setCurrentTrackId] = useRecoilValue(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilValue(isPlayingState)
    const [volume, setVolume] = useState(50)

    return ( 
        <div className='bg-red-400 p-5'>
            <div>

            </div>
        </div>
    );
}
 
export default Player;