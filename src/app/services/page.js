import React from 'react';
import styles from './Services.module.css';

export const metadata = {
    title: 'Services',
    description: '1:1 Training Sessions & Custom Programming in Seattle'
}

const Services = () => {
    return (
        <>
            <div className={styles.servicesDisplay}>
                <h1 >1:1 Training Sessions & Custom Programming in Seattle</h1>
                <div>Two ways to work together, one consistent approach: everything built around how you actually move, where you're trying to go, and what your life looks like right now.</div> 
                <h2 id='training'>1:1 Training Sessions</h2>
                <div>This is hands-on coaching: you and me, working through every session together. I'm watching how you move, adjusting in real time, and building a picture of your body over time that informs everything we do.</div>
                <div>Sessions are fully individual. No group classes, no split attention. Every minute is focused on you.</div>
                <h3>How it works:</h3>
                <ul className={styles.noGap}>
                    <li>We start with a conversation about your goals, history, and what's felt like limitations.</li>
                    <li>Sessions are structured around where you are right now, not a preset template.</li>
                    <li>Programming evolves session to session as I learn how you respond and what you need.</li>
                    <li>Available in-person or virtually, and the format can shift as your life does.</li>
                </ul>
                <h3>Best for:</h3>
                <ul className={styles.noGap}>
                    <li>People who want consistent, ongoing coaching support</li>
                    <li>Athletes working toward a specific performance goal</li>
                    <li>Anyone returning to movement after injury or physical therapy</li>
                    <li>People who want real-time feedback and hands-on cueing</li>
                    <li>Anyone who learns best with a coach present</li>
                </ul>
                <h3>Locations:</h3>
                <ul className={styles.noGap}>
                    <li>In-person: Rain City Fit, Capitol Hill, or sport fields throughout the Seattle</li>
                    <li>Virtual: FaceTime, Google Meet, or your preferred platform</li>
                </ul>
                <h3>60 minute session rates:</h3>
                <table>
                    <caption>60 minute session rates are $90, $110, and $130</caption>
                    <thead>
                        <tr>
                            <td></td>
                            <th scope='col'>Community</th>
                            <th scope='col'>Standard</th>
                            <th scope='col'>Abundance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>60-min Session</th>
                            <td>$90</td>
                            <td>$110</td>
                            <td>$130</td>
                        </tr>
                    </tbody>
                </table>
                <div>Payment via Venmo, Zelle, PayPal, or cash.</div>

                <h2 id='programming'>Custom Programming</h2>
                <div>Want expert-level programming you can take to the gym on your own schedule? Custom programming gives you a precision-built training plan designed around exactly how your body moves and what you're working toward.</div>
                <div>I don't write programs for people I haven't worked with in person. Before I put a plan together, I need to see you move, to understand your patterns, your history, and where the opportunities are. That's what makes the programming actually work.</div>
                <h3>How it works:</h3>
                <ul className={styles.noGap}>
                    <li>We start with 2–4 in-person assessment sessions so I can see how you move before writing your plan.</li>
                    <li>The number of sessions depends on your background and goals. Some clients are ready after two; others benefit from a few more.</li>
                    <li>Assessment sessions are billed at the 60-min session rate.</li>
                    <li>Once I have a clear picture, I write a program tailored to your goals, training history, and available equipment. For monthly programming, this is adjusted weekly according to your schedule and how the previous week went.</li>
                    <li>You take the program and train on your own schedule.</li>
                    <li>Ongoing check-ins are built into monthly programming; 1:1 training sessions are available as needed at their usual rate.</li>
                </ul>
                <h3>Best for:</h3>
                <ul className={styles.noGap}>
                    <li>Self-motivated people who prefer to train independently</li>
                    <li>Clients with scheduling constraints that make regular sessions difficult</li>
                    <li>Athletes who want structured periodization built around their competition calendar</li>
                    <li>People who've done general training before and want something more dialed in</li>
                    <li>Clients bridging from PT-style rehab into training</li>
                </ul>
                <h3>Programming rates:</h3>
                <table>
                    <caption>Summary of programming rates.</caption>
                    <thead>
                        <tr>
                            <td></td>
                            <th scope='col'>Community</th>
                            <th scope='col'>Standard</th>
                            <th scope='col'>Abundance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>60-min session - assessment, follow-up</th>
                            <td>$90/session</td>
                            <td>$110/session</td>
                            <td>$130/session</td>
                        </tr>
                        <tr>
                            <th scope='row'>Custom program, monthly</th>
                            <td>$180/month</td>
                            <td>$220/month</td>
                            <td>$260/month</td>
                        </tr>
                        <tr>
                            <th scope='row'>Custom program, per workout</th>
                            <td>$30/workout</td>
                            <td>$35/workout</td>
                            <td>$40/workout</td>
                        </tr>
                    </tbody>
                </table>
                <div>Payment via Venmo, Zelle, PayPal, or cash.</div>

                <h2>About the Sliding Scale</h2>
                <div>All rates are offered on a sliding scale based on financial access. The three tiers (Community, Standard, and Abundance) reflect different levels of income, family wealth, and financial stability.</div>
                <div>I use this model because I believe access to quality coaching shouldn't be determined solely by income. If you're in a position to pay the Abundance rate, doing so helps make it possible for others to access coaching at the Community rate. If you need the Community rate, that's exactly what it's there for. No justification required.</div>
                <div>We'll sort out the right rate together when you get in touch. No awkward conversations, no pressure.</div>
            
                <h2>Who Works with Me</h2>
                <ul className={styles.noGap}>
                    <li>People returning to activity after injury or alongside physical therapy</li>
                    <li>Athletes looking to improve sport performance: speed, power, agility, and strength</li>
                    <li>Anyone who wants to build a sustainable, long-term relationship with movement</li>
                    <li>People who've felt dismissed or cookie-cuttered by other approaches and want something more thoughtful</li>
                    <li>All experience levels, from true beginners to competitive athletes</li>
                </ul>
                <div style={{textAlign: 'center', paddingTop: '20px'}}>                
                    <a className={styles.btn} href='https://docs.google.com/forms/d/e/1FAIpQLSemCFI-iCeKT35uLwsFK8yb3fAEyi4oUv151rJuMQkQ3mI8Lg/viewform?usp=sharing'>Fill Out the Interest Form</a>
                </div>
            </div>
        </>
    )
}

export default Services;