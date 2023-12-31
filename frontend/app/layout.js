import {Inter} from 'next/font/google'
import './globals.css'
import NavBar from "../components/navbar";
import {Providers} from "@/components/providers";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'KG OLAP FrontEnd',
    description: 'Generated by create next app',
}

export default function RootLayout({children}) {
    return (
        <html suppressHydrationWarning lang="en">
            <body className={inter.className}>
                <Providers>
                <main>
                    <NextTopLoader showSpinner={false}/>
                    <NavBar/>
                    {children}
                </main>
                </Providers>
            </body>
        </html>
    )
}
