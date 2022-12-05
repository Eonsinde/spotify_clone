import { useEffect } from "react";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import SpotifyWebApi from "spotify-web-api-node";


// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
})

export default function useSpotify() {
    const router = useRouter()
    const { data:session } = useSession()

    useEffect(() => {
        if (session) {
            // if attempt to refresh token fails redirect to log in
            if (session.error === 'RefreshAccessTokenError') {
                router.push('/login');
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session])

    return spotifyApi;
}

