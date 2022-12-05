import { useSession } from "next-auth/react";
import { useRouter } from 'next/router'


const Auth = ({ children }) => {
    const router = useRouter()
    const { data:session, status } = useSession({
        required: true,
        onUnauthenticated(){
            router.push('/login')
        }
    })

    if (session === null && status === 'loading')
        return <p>Loading ...</p>

    // user is authenticated
    return (<>
        {children}
    </>);
}
 
export default Auth;