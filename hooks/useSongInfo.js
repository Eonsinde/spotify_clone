import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";


// this custom hook is to fetch details about a track using the ID 
// of the currently active track in our recoil state
const useSongInfo = () => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState()
    
    useEffect(() => {
        const fetchSingInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json())

                setSongInfo(trackInfo)
            }
        }

        fetchSingInfo()
    }, [currentTrackId, spotifyApi])

    return songInfo
}
 
export default useSongInfo;