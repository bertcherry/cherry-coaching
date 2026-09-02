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
                        <div>I came into this work because I believe there is nothing more empowering than connecting with our bodies.</div>
                        <div>Over the past decade, I've worked with people at all stages, from athletes returning from injury to beginners finding their footing. My work spans sport performance, fitness for daily life and healthy aging, and bridging the gap from physical therapy back to full activity.</div>
                        <div>I look at movement through the lens of the nervous system. I consider how stress, past injuries, and life history all shape the way you move and respond. That means I'm never just looking at what's happening in the gym, I'm looking at the full picture of you.</div>
                        <div>What lights me up isn't just a client hitting a PR. I love it when a client gets through an activity pain-free again or feels an exercise in the right spot.</div>
                        <div>I spend a lot of time in sessions asking people to tune into their experience and really feel what's happening in their bodies. Building body awareness is one of the most valuable things clients take away from our work together, whether we're training side by side or I'm writing their program.</div>
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
                            <li>Speed and agility technique for field and court sports</li>
                            <li>Fall risk reduction progressions for aging clients</li>
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