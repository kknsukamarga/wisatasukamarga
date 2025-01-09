import React, { useState, useEffect, useRef } from "react";

const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInView(entries[0].isIntersecting);
      },
      { threshold: 1.0 } // Pastikan elemen sepenuhnya terlihat
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, inView };
};

export default useInView;
