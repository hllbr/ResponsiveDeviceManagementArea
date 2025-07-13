import { useEffect, useRef, useState } from "react";

export default function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0];
      if (entry) {
        setWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(element);

    // Initialize width immediately
    setWidth(element.clientWidth);

    return () => observer.disconnect();
  }, []);

  return { ref, width };
}
