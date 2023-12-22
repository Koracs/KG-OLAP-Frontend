'use client'

import { ThemeProvider } from 'next-themes'
import {SessionProvider} from "next-auth/react";

export function Providers({ children }) {
    return (
        <SessionProvider>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </SessionProvider>
        )
}