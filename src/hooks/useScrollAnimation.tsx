import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold = 0.3, triggerOnce = false) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return { ref, inView };
};