import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const SkillBar = ({ skill, color, ...props }) => {
    const skillRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const { theme, isDarkTheme } = useTheme();

    // Initialize random floating movement
    useEffect(() => {
        if (skillRef.current) {
            // Random initial offset for natural distribution
            const randomX = Math.random() * 20 - 10; // between -10 and 10
            const randomY = Math.random() * 20 - 10; // between -10 and 10
            setInitialPosition({ x: randomX, y: randomY });
            setPosition({ x: randomX, y: randomY });
        }

        // Find the skills container to track mouse movement
        const container = document.querySelector('.skills-content');
        containerRef.current = container;

        // Track mouse position over container
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    // Apply repel effect - reverted to original behavior
    useEffect(() => {
        if (!skillRef.current || !containerRef.current) return;

        // Get skill tag dimensions and position
        const rect = skillRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        // Calculate tag center position relative to container
        const tagCenterX = rect.left - containerRect.left + rect.width / 2;
        const tagCenterY = rect.top - containerRect.top + rect.height / 2;

        // Calculate distance between mouse and tag center
        const distX = mousePosition.x - tagCenterX;
        const distY = mousePosition.y - tagCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Only apply repel effect if mouse is close enough
        const repelDistance = 100; // Original value

        if (distance < repelDistance) {
            // Repel strength gets stronger as mouse gets closer - original 30px max displacement
            const repelFactor = (1 - (distance / repelDistance)) * 30;

            // Calculate repel direction (normalized vector from mouse to tag)
            const repelDirectionX = distX !== 0 ? -distX / distance : 0;
            const repelDirectionY = distY !== 0 ? -distY / distance : 0;

            // Apply repel effect
            const repelX = repelDirectionX * repelFactor;
            const repelY = repelDirectionY * repelFactor;

            // Smoothly animate to new position
            setPosition({
                x: initialPosition.x + repelX,
                y: initialPosition.y + repelY
            });
        } else {
            // Gradually return to initial position when mouse is far away
            setPosition({
                x: initialPosition.x,
                y: initialPosition.y
            });
        }

        // Apply subtle floating effect to all tags
        const floatAnimation = () => {
            const time = Date.now() * 0.001; // Convert to seconds
            const floatX = Math.sin(time * 0.5 + initialPosition.x) * 3;
            const floatY = Math.cos(time * 0.3 + initialPosition.y) * 3;

            setPosition(prev => ({
                x: (distance < repelDistance ? prev.x : initialPosition.x + floatX),
                y: (distance < repelDistance ? prev.y : initialPosition.y + floatY)
            }));

            animationId = requestAnimationFrame(floatAnimation);
        };

        let animationId = requestAnimationFrame(floatAnimation);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [mousePosition, initialPosition]);

    // Animation and visibility observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the skill tag becomes visible, animate it
                if (entry.isIntersecting) {
                    if (skillRef.current) {
                        skillRef.current.classList.add('skill-tag-visible');
                    }
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
    }, []);

    // Create a completely new color approach 
    const getColor = () => {
        // Use index from props to create variation
        const index = parseInt(props['data-key'] || 0);

        // New color palettes that are more visually distinct and appealing
        // Each has a base, accent, and gradient direction
        const colorSets = [
            // Deep blue to teal
            {
                base: '#1a2980',
                accent: '#26d0ce',
                gradient: '135deg'
            },
            // Purple to pink
            {
                base: '#4a157c',
                accent: '#cd4ed8',
                gradient: 'to right'
            },
            // Teal to lime
            {
                base: '#086e4b',
                accent: '#2fd98c',
                gradient: '135deg'
            },
            // Crimson to orange
            {
                base: '#8a0c40',
                accent: '#eb6b40',
                gradient: 'to right'
            },
            // Navy to light blue
            {
                base: '#0b235a',
                accent: '#2b87d3',
                gradient: '135deg'
            },
            // Dark green to light green
            {
                base: '#155831',
                accent: '#3dd97f',
                gradient: 'to right'
            },
            // Deep orange to yellow
            {
                base: '#c95311',
                accent: '#f2b63c',
                gradient: '135deg'
            },
            // Dark purple to light blue
            {
                base: '#5b0c7a',
                accent: '#3f84e5',
                gradient: 'to right'
            }
        ];

        // Select a color set based on the index
        const colorSet = colorSets[index % colorSets.length];

        // Create gradient
        return `linear-gradient(${colorSet.gradient}, ${colorSet.base}, ${colorSet.accent})`;
    };

    return (
        <div
            className="skill-tag"
            ref={skillRef}
            style={{
                background: getColor(),
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: 'box-shadow 0.3s ease'
            }}
            {...props}
        >
            {skill}
        </div>
    );
};

export default SkillBar;