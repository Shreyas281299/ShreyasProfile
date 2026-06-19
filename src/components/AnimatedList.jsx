import { useEffect, useRef, useState } from "react";

export function AnimatedList({ className = "", items, renderItem }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <ul ref={ref} className={`animated-list ${isVisible ? "is-visible" : ""} ${className}`.trim()}>
      {items.map((item, index) => (
        <li className="animated-list-item" key={item} style={{ "--item-index": index }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
