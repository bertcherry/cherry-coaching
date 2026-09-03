import React from "react";
import Link from "next/link";
import './index.css'
import logo from '../assets/CherryCoachingLogo.png';

export const metadata = {
    title: 'Cherry Coaching',
    type: 'website',
    creator: 'Bert Cherry'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="theme-color" content="#000000" />
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">
                <header className='banner'>
                    <Link href='/' className='logo'><img src={logo.src} alt='Cherry Coaching'/></Link>
                    <nav aria-label='Primary'>
                        <ul className='navList'>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/about'>About</Link></li>
                            <li><Link href='/services'>Services</Link></li>
                        </ul>
                    </nav>
                </header>
                <main className='app'>{children}</main>
                </div>
            </body>
        </html>
    )
  }