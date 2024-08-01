import React from 'react';
import '../styles/Contact.css';

const Contact = () => (
    <section id="contact" className="contact">
        <h2>Contact</h2>
        <p>You can find me on:</p>
        <ul>
            <li><a href="https://github.com/Blank014" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/imad-eddin-alkuzbari" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="mailto:imadkuzbari@gmail.com">Email</a></li>
            {/* Add more social links as needed */}
        </ul>
    </section>
);

export default Contact;
