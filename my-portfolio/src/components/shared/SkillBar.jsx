import React, { useState, useEffect, useRef } from 'react';

const SkillBar = ({ skill, level, color }) => {
    const [width, setWidth] = useState(0);
    const skillRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the skill bar becomes visible, animate it
                if (entry.isIntersecting) {
                    setWidth(level);
                    // Disconnect after animation starts
                    observer.disconnect();
                }
            },
            { threshold: 0.2 } // Trigger when 20% visible
        );

        if (skillRef.current) {
            observer.observe(skillRef.current);
        }

        return () => {
            if (skillRef.current) {
                observer.unobserve(skillRef.current);
            }
        };
    }, [level]);

    return (
        <div className="skill-bar-container" ref={skillRef}>
            <div className="skill-info">
                <span className="skill-name">{skill}</span>
                <span className="skill-percentage">{level}%</span>
            </div>
            <div className="skill-bar">
                <div
                    className="skill-progress"
                    style={{
                        width: `${width}%`,
                        backgroundColor: color || 'var(--primary)'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default SkillBar;