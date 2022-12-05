import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"


const refreshAccessToken = async (token) => {
    try {
        console.log("trying to refresh access token")
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshToken);

        const { body: refreshToken } = await spotifyApi.refreshAccessToken(token);
        console.log("Refreshed access token: " + refreshToken);

        // set new token to expire one hour from the current time it was refreshed
        return {
            ...token,
            accessToken: refreshToken.accessToken,
            accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
            refreshToken: refreshToken.refreshToken ?? token.refreshToken
        }
    } catch (e) {
        console.error(e);

        return {
            ...token,
            error: "RefreshAccessTokenError"
        }
    }
}


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_PUBLIC_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'  
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // console.log(`token object: ${token}\n account: ${account}\n user: ${user}\n`);

            // initial sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    // convert the time to milliseconds 
                    // note: it is an hour from when the token will expire
                    accessTokenExpires: account.expires_at * 1000, 
                }
            }

            // return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires){
                console.log("Exsiting access token is valid")
                return token;
            }

            // access token has expired, trigger a refresh
            console.log("access token has expired, REFRESHING...");
            return await refreshAccessToken(token);
        },

        // this function is to expose the necessary data from the token object to the client
        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;
            // console.log("Session", session);

            return session;
        }
    }
}

export default NextAuth(authOptions)