import React, { useEffect, useRef } from 'react';
import '../../styles/TextScramble.css';

class TextScrambler {
    constructor() {
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(element, newText) {
        const oldText = element.innerText || '';
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.element = element;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }

        if (this.element) {
            this.element.innerHTML = output;
        }

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

const TextScramble = ({ text, delay = 0, className = '', onComplete = null, phrases = null }) => {
    const textRef = useRef(null);
    const scramblerRef = useRef(null);
    const counterRef = useRef(0);
    const phrasesRef = useRef(phrases ? [...phrases] : null);

    useEffect(() => {
        if (!scramblerRef.current) {
            scramblerRef.current = new TextScrambler();
        }

        const element = textRef.current;

        if (!element) return;

        // If there's a delay before starting
        const timer = setTimeout(() => {
            if (phrasesRef.current) {
                // If we have multiple phrases, cycle through them
                const cycleText = () => {
                    const currentPhrase = phrasesRef.current[counterRef.current];

                    scramblerRef.current.setText(element, currentPhrase).then(() => {
                        setTimeout(() => {
                            counterRef.current = (counterRef.current + 1) % phrasesRef.current.length;
                            cycleText();
                        }, 800);
                    });
                };

                cycleText();
            } else {
                // Single text mode
                scramblerRef.current.setText(element, text).then(() => {
                    if (onComplete) onComplete();
                });
            }
        }, delay);

        return () => {
            clearTimeout(timer);
            if (scramblerRef.current) {
                cancelAnimationFrame(scramblerRef.current.frameRequest);
            }
        };
    }, [text, delay, onComplete]);

    return (
        <span ref={textRef} className={`text-scramble ${className}`}></span>
    );
};

export default TextScramble;