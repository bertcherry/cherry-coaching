import styles from './Home.module.css';
import outdoors from '../../assets/Bert Outdoors.jpg';
import { Helmet } from 'react-helmet';

const Home = () => {

    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Cherry Coaching website, copyright Bert Cherry 2024."/>
            </Helmet>
            <div className={styles.homeDisplay}>
                <div className={styles.imgContainer}>
                    <img src={outdoors} alt='Bert, a white person with colorful hair, stands outside holding a kettlebell and smiling in front of a group of people.'/>
                    <div className={styles.impact}>Personalized strength & conditioning coaching and programming for people who want support in reaching their goals.</div>
                </div>
                <h2>What It Is</h2>
                <div>Individual guidance, deliberate connection, and compassion. Finding the heart of your motivation and understanding how your history informs your movement patterns to design a plan that works for you.</div>
                <div>We’ll build a relationship over time that informs our work together. We’ll adapt and change as your life does to make sure we’re always connected with your goals.</div>
                <h2>What it's Not</h2>
                <div>Diet culture, shame, guilt trips, or cookie cutter workouts.</div>
                <div>I’m not interested in being a glorified rep counter or your drill sergeant. I don’t go for narratives about movement as punishment or calling certain foods “bad”. I’m here to support you as a whole human. We acknowledge that all stress is stress, including exercise!</div>
                <h2>Availability & Rates</h2>
                <div>I currently offer in-person and virtual 1:1 coaching sessions. In-person sessions take place at one of the Rain City Fit locations on Cap Hill and SoDo or at sport fields throughout the CD and Cap Hill. Virtual sessions use a suitable platform such as Google Meet or FaceTime.</div>
                <div>Services are offered on a <a href='https://docs.google.com/document/d/1x4m2mbG5s-C7Ns5vZETRU3ZO--vL6rbeWUiyKBZyeGE/edit?usp=sharing'>flexible pricing structure</a> with rates ranging from $90-130 per hour-long session payed via Venmo, PayPal, or cash.</div>
                <a className={styles.btn} href='https://docs.google.com/forms/d/e/1FAIpQLSemCFI-iCeKT35uLwsFK8yb3fAEyi4oUv151rJuMQkQ3mI8Lg/viewform?usp=sharing'>Interest Form</a>
            </div>
        </>
    )
}

export default Home;