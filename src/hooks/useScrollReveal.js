import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Hook para revelar un solo elemento - OPTIMIZADO
export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoizar opciones para evitar re-renders
  const observerOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px 0px -50px 0px',
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // If element already has 'revealed' class (from previous visit), mark visible immediately
    try {
      if (currentRef.classList && currentRef.classList.contains('revealed')) {
        setIsVisible(true);
        return;
      }
    } catch (e) {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Usar requestAnimationFrame para animación más fluida
          requestAnimationFrame(() => {
            setIsVisible(true);
            // Marcar el elemento como revelado permanentemente para evitar re-flash
            try { currentRef.classList.add('revealed'); } catch(e) { /* safe */ }
          });
          observer.unobserve(currentRef);
        }
      },
      observerOptions
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [observerOptions]);

  return [ref, isVisible];
};

// Hook para revelar multiples elementos - OPTIMIZADO
export const useMultipleScrollReveal = (count, options = {}) => {
  const refs = useRef([]);
  const [visibleItems, setVisibleItems] = useState(() => new Array(count).fill(false));

  const observerOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px 0px -30px 0px',
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const currentRefs = refs.current;
    if (!currentRefs || currentRefs.length === 0) return;

    // If some refs already marked 'revealed', set visibleItems accordingly
    setVisibleItems((prev) => {
      const newVisible = [...prev];
      currentRefs.forEach((el, idx) => {
        try {
          if (el && el.classList && el.classList.contains('revealed')) {
            newVisible[idx] = true;
          }
        } catch (e) {}
      });
      return newVisible;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target);
            if (index !== -1) {
              // requestAnimationFrame para fluidez
              requestAnimationFrame(() => {
                setVisibleItems((prev) => {
                  if (prev[index]) return prev; // Evitar actualizaciones innecesarias
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
                // Añadir clase "revealed" al objetivo para que no vuelva a ocultarse
                try { entry.target.classList.add('revealed'); } catch(e) {}
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      observerOptions
    );

    currentRefs.filter(Boolean).forEach((refEl) => observer.observe(refEl));

    return () => observer.disconnect();
  }, [count, observerOptions]);

  const setRef = useCallback((index) => (el) => {
    refs.current[index] = el;
  }, []);

  return [setRef, visibleItems];
};

// Hook para revelar elementos en secuencia (stagger effect) - OPTIMIZADO
export const useStaggerReveal = (count, options = {}) => {
  const containerRef = useRef(null);
  const [isContainerVisible, setIsContainerVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState(() => new Array(count).fill(false));
  const timeoutsRef = useRef([]);

  const observerOptions = useMemo(() => ({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px 0px -30px 0px',
  }), [options.threshold, options.rootMargin]);

  useEffect(() => {
    const currentRef = containerRef.current;
    if (!currentRef) return;

    // If container already revealed, set visible immediately
    try {
      if (currentRef.classList && currentRef.classList.contains('revealed')) {
        setIsContainerVisible(true);
        // also mark children
        const children = Array.from(currentRef.children || []);
        setVisibleItems((prev) => {
          const newVisible = [...prev];
          children.forEach((ch, i) => {
            if (ch.classList && ch.classList.contains('revealed')) newVisible[i] = true;
          });
          return newVisible;
        });
        return;
      }
    } catch (e) {}

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            setIsContainerVisible(true);
          });
          observer.unobserve(currentRef);
        }
      },
      observerOptions
    );

    observer.observe(currentRef);

    return () => observer.disconnect();
  }, [observerOptions]);

  useEffect(() => {
    if (!isContainerVisible) return;

    const staggerDelay = options.staggerDelay || 80; // Reducido para más fluidez
    
    // Limpiar timeouts anteriores
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    for (let i = 0; i < count; i++) {
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          setVisibleItems((prev) => {
            const newVisible = [...prev];
            newVisible[i] = true;
            return newVisible;
          });
          // Intentar marcar el hijo correspondiente como revelado en el DOM
          try {
            const children = containerRef.current?.children || [];
            if (children[i]) children[i].classList.add('revealed');
          } catch (e) {}
        });
      }, i * staggerDelay);
      timeoutsRef.current.push(timeoutId);
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [isContainerVisible, count, options.staggerDelay]);

  return [containerRef, visibleItems, isContainerVisible];
};

export default useScrollReveal;
