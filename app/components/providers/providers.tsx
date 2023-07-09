'use client';
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux';
import React from 'react'
import store from '@/app/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({
    defaultOptions : {
        queries : {
            refetchOnWindowFocus:false,
        }
    }
});

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                <QueryClientProvider client={client}>
                    {children}
                </QueryClientProvider>
            </Provider>
        </SessionProvider>
    )
}

export default Providers