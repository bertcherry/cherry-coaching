import React from 'react';
import Link from 'next/link';
import styles from './About.module.css';
import headshot from '../../assets/headshot.jpeg';

export const metadata = {
    title: 'About',
    description: 'Bert Cherry (she/they) - NSCA Certified Strength & Conditioning Coach'
}

const About = () => {
    return (
        <>
            <div className={styles.aboutDisplay}>
                <h1 style={{marginBottom: '-40px'}}>Bert Cherry (they/she)</h1>
                <h2>NSCA Certified Strength & Conditioning Coach</h2> 
                <div className={styles.flexContainer}>
                    <div className={styles.imgContainer}>
                        <img src={headshot.src} alt='Bert, a white femme presenting personal trainer, stands in front of a blossoming cherry tree.'/>
                    </div>
                    <div className={styles.bioContainer}>
                        <h2>Why I Coach the Way I Do</h2>
                        <div>I came into this work because I believe in there is nothing more empowering than connecting with our bodies.</div>
                        <div>Over the past decade, I've worked with people at all stages: athletes returning from injury, beginners finding their footing, and everyone in between. My work spans sport performance, injury rehabilitation, and bridging the gap from physical therapy back to full activity. The through-line across all of it is a deeply individual approach.</div>
                        <div>I'm trained to look at movement through the lens of the nervous system: how stress, past injuries, and life history all shape the way we move and respond. That means I'm never just looking at what's happening in the gym; I'm looking at the full picture of you.</div>
                        <h3>The Movements That Drive This Work</h3>
                        <div>What lights me up isn't just hitting a PR. It's when a client notices they got through an activity pain-free for the first time. When someone makes a surprising play in their sport. When a client finally feels an exercise working exactly where it should, and their face changes because they get it now.</div>
                        <div>I spend a lot of time in sessions asking people to tune into their experience and really feel what's happening in their bodies. That awareness, built over time, is one of the most valuable things you can take away from our work together, whether we're training side by side or I'm writing your program.</div>
                        <div>If deepening your relationship with your own body sounds like something you want, this coaching relationship is worth exploring.</div>
                        <h3>Credentials</h3>
                        <ul>
                            <li>NSCA Certified Strength & Conditioning Specialist (CSCS)</li>
                            <li>USA Weightlifting Sport Performance Coach</li>
                            <li>NSPA Certified Speed and Agility Coach</li>
                            <li>10+ years of experience across sport performance, injury rehabilitation, and general fitness</li>
                        </ul>
                        <h3>Training Methods</h3>
                        <ul>
                            <li>Barbell strength training</li>
                            <li>Olympic Weightlifting</li>
                            <li>Kettlebells for strength, power, endurance, and mobility</li>
                            <li>Mobility work including passive, active, and weighted approaches</li>
                            <li>Speed and agility technique for field sports</li>
                        </ul>
                        <div style={{padding: '20px'}}>                        
                            <Link href='/services' className={styles.btn}>See How We Can Work Together</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;