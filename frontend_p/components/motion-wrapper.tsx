'use client';

// Import specific components with named imports
import { 
  motion as framerMotion,
  AnimatePresence,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
  MotionConfig,
  LayoutGroup
} from 'framer-motion';

// Export the components directly for HTML elements
export const motion = {
  div: framerMotion.div,
  h1: framerMotion.h1,
  p: framerMotion.p,
  span: framerMotion.span,
  button: framerMotion.button,
  a: framerMotion.a,
  ul: framerMotion.ul,
  li: framerMotion.li,
  section: framerMotion.section,
  header: framerMotion.header,
  footer: framerMotion.footer,
  main: framerMotion.main,
  nav: framerMotion.nav,
  article: framerMotion.article,
  aside: framerMotion.aside,
};

// Export other utilities
export { 
  AnimatePresence,
  useAnimate,
  useInView,
  useScroll,
  useTransform,
  MotionConfig,
  LayoutGroup
};

// Export animation helpers
export const animate = framerMotion.animate;
