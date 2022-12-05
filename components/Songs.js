import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playlistAtoms";
import Song from "./Song";



const Songs = () => {
    const currentPlaylist = useRecoilValue(playListState)
    console.log(currentPlaylist)

    return ( 
        <div className="text-white px-8 flex flex-col space-y-1 pb-2">
            {currentPlaylist?.tracks.items.map((track, index) => (
                <Song key={track.track.id} track={track} order={index} />
            ))}
        </div>
    );
}
 
export default Songs;