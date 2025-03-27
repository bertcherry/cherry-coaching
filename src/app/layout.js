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
                <div className='banner'>
                    <Link href='/' className='logo'><img src={logo.src} alt='Cherry Coaching'/></Link>
                    <nav>
                        <ul className='navList'>
                            <li><Link href='/'>Home</Link></li>
                            <li><Link href='/about'>About</Link></li>
                        </ul>
                    </nav>    
                </div>
                <div className='app'>{children}</div>
                </div>
            </body>
        </html>
    )
  }