import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import SpotifyWebApi from "spotify-web-api-node";


const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    // "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(',');

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params);

// The login process will be initiated by sending the user to this URL
export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
});
  

export default spotifyApi;