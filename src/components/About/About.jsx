import Nav from '../Nav/Nav';
import styles from './About.module.css';
import headshot from '../../assets/headshot.jpeg';

const Home = () => {
    return (
        <div className={styles.container}>
            <Nav />
            <div className={styles.aboutDisplay}>
                <div className={styles.imgContainer}>
                    <img src={headshot} alt='Bert, a white femme presenting person, stands in front of a blooming cherry tree.'/>
                </div>
                <div>Bert Cherry (she/they) is an NSCA Certified Strength & Conditioning Coach with nearly 10 years of experience helping people of all ages connect with their bodies to increase sport performance, develop resilience against injuries, and bridge the gap from physical therapy to full return to activities.</div>
            </div>
        </div>
    )
}

export default Home;