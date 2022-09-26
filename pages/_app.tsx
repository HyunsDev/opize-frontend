import { OpizeWrapper } from 'opize-design-system';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Flip, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '../styles/globals.css';
import 'opize-design-system/dist/style/font.css';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { client } from '../utils/opizeClient';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        client.updateAuth(localStorage.getItem('opizeToken') as string);
    });

    return (
        <OpizeWrapper>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={true} />
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                        transition={Flip}
                    />
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </OpizeWrapper>
    );
}

export default MyApp;
