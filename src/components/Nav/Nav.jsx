import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../assets/CherryCoachingLogo.png';

function Nav() {
    return (
        <div className={styles.banner}>
            <Link to='/' className={styles.logo}><img src={logo} alt='Cherry Coaching'/></Link>
            <nav>
                <ul className={styles.navList}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;