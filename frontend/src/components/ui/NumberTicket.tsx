import { cn } from "../../lib/utils";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number; // delay in s
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    const updateTextContent = () => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          springValue.get().toFixed(0)
        );
      }
    };

    const unsubscribe = springValue.onChange(updateTextContent);
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums",
        className,
      )}
      ref={ref}
    />
  );
}
