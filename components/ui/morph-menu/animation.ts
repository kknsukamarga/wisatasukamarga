type AnimationConfig = {
  opacity: number;
  rotateX?: number;
  translateY?: number;
  translateX?: number;
  y?: number;
  transition?: {
    duration: number;
    delay?: number;
    ease?: number[] | string;
    opacity?: { duration: number };
    type?: string;
  };
};

type AnimationVariant = {
  initial: AnimationConfig;
  enter: (i: number) => AnimationConfig;
  exit: AnimationConfig;
};

export const perspective: AnimationVariant = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65, // Ensure all animations share the same duration
      delay: 0.3 + i * 0.05, // Reduced base delay and stagger
      ease: "easeInOut", // Smoother easing curve
    },
  }),
  exit: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    transition: {
      duration: 0.5,
      ease: "easeInOut", // Matching ease for consistency
    },
  },
};

export const slideIn: AnimationVariant = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeInOut",
    },
  },
};
