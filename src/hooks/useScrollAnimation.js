import { useEffect, useRef } from 'react';

/**
 * Custom hook to add scroll-triggered animations to elements
 * @param {Object} options - Animation options
 * @param {String} options.threshold - Percentage of element visible to trigger animation (0 to 1)
 * @param {String} options.animation - CSS class to apply when element is visible
 * @param {Boolean} options.once - Whether to apply the animation only once
 * @returns {Object} Ref to attach to the element
 */
const useScrollAnimation = ({
    threshold = 0.1,
    animation = 'animate',
    once = true,
    rootMargin = '0px'
} = {}) => {
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Add class when element is intersecting
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animation);

                        // If animation should only happen once, unobserve after adding class
                        if (once) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!once) {
                        // If not once mode, remove class when element is not intersecting
                        entry.target.classList.remove(animation);
                    }
                });
            },
            {
                threshold,
                rootMargin
            }
        );

        observer.observe(currentRef);

        // Cleanup
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [animation, once, threshold, rootMargin]);

    return ref;
};

export default useScrollAnimation;