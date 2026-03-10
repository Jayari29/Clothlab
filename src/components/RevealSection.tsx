import { useEffect, useRef, type ReactNode } from 'react';

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    from?: 'bottom' | 'left' | 'right';
}

/**
 * Wraps children with a scroll-triggered fade+slide reveal.
 * The animation plays once when the element enters the viewport.
 */
export const RevealSection = ({ children, className = '', delay = 0, from = 'bottom' }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('rs-visible');
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`rs-wrap rs-from-${from} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
