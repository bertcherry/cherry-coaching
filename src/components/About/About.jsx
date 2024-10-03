import styles from './About.module.css';
import headshot from '../../assets/headshot.jpeg';
import { Metadata } from '../Metadata';

const About = () => {
    return (
        <>
            <Metadata title="About" description="Bert Cherry (she/they) - NSCA Certified Strength & Conditioning Coach, USA Weightlifting Sport Performance Coach" type="website" creator="Bert Cherry" />
            <div className={styles.aboutDisplay}>
                <h1>Bert Cherry (she/they)</h1>
                <h2>NSCA Certified Strength & Conditioning Coach, USA Weightlifting Sport Performance Coach</h2> 
                <div className={styles.flexContainer}>
                    <div className={styles.imgContainer}>
                        <img src={headshot} alt='Bert, a white femme presenting person, stands in front of a blooming cherry tree.'/>
                    </div>
                    <div className={styles.bioContainer}>
                        <div>I have nearly 10 years of experience helping people of all ages connect with their bodies to increase sport performance, develop resilience against injuries, and bridge the gap from physical therapy to full return to activities.</div>
                        <div>I'm experienced in the following training modalities and use a blended approach of all of the following according to client needs:</div>
                        <ul>
                            <li>Barbell strength training</li>
                            <li>Olympic Weightlifting</li>
                            <li>Kettlebells for strength, power, endurance, and mobility</li>
                            <li>Variety of mobility methods including passive, active, and weighted movements</li>
                            <li>Speed and agility technique for field sports</li>
                        </ul>
                        <div>My approach is focused on movement patterns involved in life and sport, and seeing the ways past injuries or other stressors impact a client. It is a deeply individual approach with consideration for how the nervous system interprets the world and governs our responses.</div>
                        <div>I am invested in clients making progress in nuanced ways as well as the obvious ones. When someone notices improvements in their daily life, makes a surprising play in sports, or gets through an activity pain-free, that absolutely lights me up. I get the same satisfaction and joy when a client feels an exercise working the place we're targeting. I appreciate seeing people's connections with their own bodies deepen over time; I spend a lot of time in sessions asking people to tune into their experience and really feel what's happening. If that sounds like the kind of relationship with yourself you want to build, this would be a worthwhile coaching relationship, as well!</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;