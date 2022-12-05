import { getProviders, signIn } from "next-auth/react";
import Image from 'next/image'


const Login = ({ providers }) => {

    return ( 
        <div className='flex justify-center items-center bg-[#0e0e0e] h-screen overflow-hidden'>
            <div className='flex flex-col space-y-4 justify-center items-center p-12 border-[3px] border-[#18D860]'>
                <Image 
                    className='w-52' 
                    width={200}
                    height={200}
                    src='https://links.papareact.com/9xl' 
                    alt='spotify logo' 
                />
                {
                    Object.values(providers).map(provider => (
                        <div key={provider.name}>
                            <button 
                                className='bg-[#18D860] text-white py-5 px-8 rounded-full ring-[#3ff08357] hover:ring-4 hover:shadow-xl transition-all ease-in-out'
                                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                            >
                                Login With {provider.name}
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default Login;


export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}