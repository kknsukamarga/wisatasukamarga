"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Button from "./button";
import styles from "./style.module.scss";
import MorphMenu from "./morph-menu";

const MorphNav = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [responsiveSize, setResponsiveSize] = useState({
    width: "80vw",
    height: "90vh",
  });

  // Calculate responsive size only in the client
  useEffect(() => {
    const calculateResponsiveSize = () => {
      const width = window.innerWidth > 768 ? "40vw" : "80vw";
      const height = window.innerWidth > 768 ? "70vh" : "90vh";
      setResponsiveSize({ width, height });
    };

    calculateResponsiveSize(); // Set initial size
    window.addEventListener("resize", calculateResponsiveSize); // Update on resize

    return () => window.removeEventListener("resize", calculateResponsiveSize); // Cleanup
  }, []);

  const menu: Variants = {
    open: {
      ...responsiveSize,
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

  return (
    <div className={`${styles.header} right-5 top-5 md:right-5 md:top-5 z-50`}>
      <motion.div
        className={`${styles.menu} shadow-md`}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        style={{
          width: isActive ? responsiveSize.width : "100px",
          height: isActive ? responsiveSize.height : "40px",
        }}
      >
        <AnimatePresence>{isActive && <MorphMenu />}</AnimatePresence>
      </motion.div>

      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
};

export default MorphNav;
