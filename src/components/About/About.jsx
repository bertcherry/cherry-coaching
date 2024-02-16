import styles from './About.module.css';
import headshot from '../../assets/headshot.jpeg';

const Home = () => {
    return (
        <>
            <div className={styles.aboutDisplay}>
                <div className={styles.imgContainer}>
                    <img src={headshot} alt='Bert, a white femme presenting person, stands in front of a blooming cherry tree.'/>
                </div>
                <div>Bert Cherry (she/they) is an NSCA Certified Strength & Conditioning Coach with nearly 10 years of experience helping people of all ages connect with their bodies to increase sport performance, develop resilience against injuries, and bridge the gap from physical therapy to full return to activities.</div>
                <div>Bert is experienced in the following training modalities and uses a blended approach of all of the following according to client needs:</div>
                <ul>
                    <li>Barbell strength training</li>
                    <li>Olympic Weightlifting</li>
                    <li>Kettlebells for strength, power, endurance, and mobility</li>
                    <li>Variety of mobility methods including passive, active, and weighted movements</li>
                </ul>
                <div>Their approach is focused on movement patterns involved in life and sport, and seeing the ways past injuries or other stressors impact a client. It is a deeply individual approach with consideration for how the nervous system interprets the world and governs our responses to it.</div>
            </div>
        </>
    )
}

export default Home;