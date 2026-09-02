import React from 'react';
import Link from 'next/link';
import styles from './Home.module.css';
import outdoors from '../assets/Bert Outdoors.jpg';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export const metadata = {
    title: {
        template: '%s | Cherry Coaching',
        default: 'Cherry Coaching',
    },
    description: 'Cherry Coaching website, copyright Bert Cherry 2026.'
}
 
export default function Page() {
  return (    
    <>
        <div className={styles.homeDisplay}>
            <h1>Strength & conditioning coaching in Seattle</h1>
            <div>Cherry Coaching offers in-person and virtual 1:1 training sessions and custom programming for people who want to move better, perform at their best, and build a lasting relationship with their body.</div>
            <div className={styles.imgContainer}>
                <img src={outdoors.src} alt='Bert, a white S&C coach with colorful hair, stands outside holding a kettlebell and smiling in front of a group of people.'/>
                <div className={styles.impact}>NSCA Certified Strength & Conditioning Specialist | 10+ Years Experience</div>
            </div>
            <a className={styles.btn} href='https://docs.google.com/forms/d/e/1FAIpQLSemCFI-iCeKT35uLwsFK8yb3fAEyi4oUv151rJuMQkQ3mI8Lg/viewform?usp=sharing'>Get in Touch</a>
            <h2>Coaching Grown Through Relationship</h2>
            <div>Whether you want a coach supporting every session or a personalized program to run on your own, the foundation is understanding your history, goals, how your body moves, and how training fits into your life. From there, we continue adjusting and refining as we both learn more about you and adapt as your life and needs change.</div>
            <h2><Link href='services' style={{color: 'var(--light-peach)'}}>Two Ways to Work Together</Link></h2>
            <div>Choose one or create a blend of the two according to your needs and how coaching can best support your life.</div>
            <div className={styles.cards}>
                <Link href='/services#training' className={styles.card}>
                    <h3>1:1 Training Sessions</h3>
                    <div>Work side by side with a coach who's fully focused on you.</div>
                    <ul>
                        <li>In-person at my 1:1 studio near Jimi Hendrix Park, at Rain City Fit on Cap Hill, or sports fields around central Seattle</li>
                        <li>Virtual via FaceTime, Google Meet, or your preferred platform</li>
                        <li>60 minutes; sliding scale $90-130 per session</li>
                        <li>Hands-on cueing, real-time adjustments, ongoing coaching relationship</li>
                    </ul>
                </Link>
                <Link href='/services#programming' className={styles.card}>
                    <h3>Custom Programming</h3>
                    <div>A program built for you to train on your own schedule.</div>
                    <ul>
                        <li>Starts with 2-4 in-person assessment sessions, $90-130 each</li>
                        <li>Monthly Plans from $180-260, per workout from $30-40</li>
                        <li>Tailored to your goals, history, and available equipment</li>
                        <li>Ideal if you want expert-level coaching without a fixed weekly schedule</li>
                    </ul>
                </Link>
            </div>
            <div>Rates are offered on a sliding scale based on access to financial resources. We'll sort out the right rate together when you get in touch.</div>
            <h3>What you can expect:</h3>
            <ul style={{marginTop: '0'}}>
                <li>Programming designed for your body, your goals, and your life. Not a template.</li>
                <li>A coach who pays attention to how stress, past injuries, and your nervous system affect how you move and recover.</li>
                <li>Real, ongoing connection that adapts as your life does.</li>
                <li>Attention to the nuanced wins, like moving pain-free, making a surprising play in sports, or finally feeling an exercise work exactly where it should.</li>
                <li>An approach that treats recovery and sustainability as seriously as the training itself.</li>
            </ul>
            <h3>What you won't find here:</h3>
            <div>No diet culture, no shame, no cookie-cutter plans, and no drill sergeant energy. Movement isn't punishment, food isn't "bad", and you're a whole person living a full life outside our work together.</div>
            <h2>Ready to Get Started?</h2>
            <div>Fill out the interest form and I'll be in touch within 48 hours. Not sure which option is the right fit? We'll talk through it together.</div>
            <a className={styles.btn} href='https://docs.google.com/forms/d/e/1FAIpQLSemCFI-iCeKT35uLwsFK8yb3fAEyi4oUv151rJuMQkQ3mI8Lg/viewform?usp=sharing'>Fill Out the Interest Form</a>
        </div>
    </>
)
}