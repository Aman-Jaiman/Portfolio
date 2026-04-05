import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function MotionSection({ children, className = "", id, delay = 0 }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: fade.hidden,
        visible: {
          ...fade.visible,
          transition: { ...fade.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
