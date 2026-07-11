// Shared entrance tokens: the Jakub Krehel "materialize" recipe of
// opacity + small rise + blur, on an exponential ease-out. Transform
// animation is dropped automatically for reduced-motion users via the
// MotionConfig `reducedMotion="user"` wrapper in _app.tsx.
export const ANIMATION_FROM_PROPS = { opacity: 0, y: 12, filter: 'blur(4px)' };

export const ANIMATION_TO_PROPS = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
} as const;
