"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Button from "./button";
import styles from "./style.module.scss";
import MorphMenu from "./morph-menu";

const calculateResponsiveSize = () => {
  const width = window.innerWidth > 768 ? "40vw" : "80vw";
  const height = window.innerWidth > 768 ? "70vh" : "90vh";

  return { width, height };
};

const menu: Variants = {
  open: {
    ...calculateResponsiveSize(),
    top: "-15px",
    right: "-15px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween",
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function MorphNav(): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={`${styles.header} right-5 top-5 md:right-5 md:top-5`}>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        style={{
          width: isActive ? calculateResponsiveSize().width : "100px",
          height: isActive ? calculateResponsiveSize().height : "40px",
        }}
      >
        <AnimatePresence>{isActive && <MorphMenu />}</AnimatePresence>
      </motion.div>

      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
}
