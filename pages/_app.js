import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import Auth from "../components/Auth"
import '../styles/globals.css'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Auth>
      ) : (
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      )}
    </SessionProvider>
  )
}


