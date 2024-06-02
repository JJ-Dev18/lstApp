import React, { useEffect, useRef, useState } from 'react';
import './LazyBackground.css'; // Asegúrate de tener los estilos adecuados

interface LazyBackgroundProps {
  className?: string;
  src: string;
  children?: React.ReactNode;
}

const LazyBackground: React.FC<LazyBackgroundProps> = ({ className, src, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              if (ref.current) {
                ref.current.style.backgroundImage = `url(${src})`;
                setLoading(false);
              }
            };
            observer.unobserve(ref.current!);
          }
        });
      },
      {
        rootMargin: '100px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <div
      className={`${className} ${loading ? 'skeleton' : ''}`}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default LazyBackground;
