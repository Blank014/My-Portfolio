import React from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const AnimatedSection = ({
    children,
    className = '',
    animation = 'fade-in',
    threshold = 0.1,
    delay = 0,
    once = true,
    tag: Tag = 'div',
    ...props
}) => {
    // Use our custom scroll animation hook
    const ref = useScrollAnimation({
        threshold,
        animation,
        once
    });

    const style = delay ? { animationDelay: `${delay}ms`, opacity: 0 } : {};

    return (
        <Tag
            ref={ref}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default AnimatedSection;