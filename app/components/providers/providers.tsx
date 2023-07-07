'use client';
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux';
import React from 'react'
import store from '@/app/redux/store';

function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}

export default Providers