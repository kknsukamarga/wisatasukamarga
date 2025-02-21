"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Button from "./button";
import styles from "./style.module.scss";
import MorphMenu from "./morph-menu";

const MorphNav = (): JSX.Element => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [responsiveSize, setResponsiveSize] = useState({
    width: "80vw", // Default width
    height: "60vh", // Default height
  });

  useEffect(() => {
    const calculateResponsiveSize = () => {
      const width =
        window.innerWidth >= 1024
          ? "30vw" // Desktop
          : window.innerWidth >= 768
          ? "50vw" // Tablet
          : "80vw"; // Mobile

      const height =
        window.innerWidth >= 1024
          ? "80vh" // Desktop
          : window.innerWidth >= 768
          ? "65vh" // Tablet
          : "60vh"; // Mobile

      setResponsiveSize({ width, height });
    };

    // Debounce resize event
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateResponsiveSize, 150); // Adjust debounce delay as needed
    };

    calculateResponsiveSize(); // Set initial size
    window.addEventListener("resize", handleResize); // Add resize listener

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize); // Cleanup listener
    };
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
    <div className={`${styles.header} right-8 top-[14px] z-50`}>
      <motion.div
        className={`${styles.menu} shadow-md`}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
        style={{
          width: isActive ? responsiveSize.width : "90px",
          height: isActive ? responsiveSize.height : "50px",
        }}
      >
        <AnimatePresence>{isActive && <MorphMenu />}</AnimatePresence>
      </motion.div>

      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </div>
  );
};

export default MorphNav;
