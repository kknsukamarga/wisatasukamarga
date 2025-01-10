import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { links, footerLinks } from "./data";
import { perspective, slideIn } from "./animation";

interface Link {
  title: string;
  href: string;
}

export default function MorphMenu(): JSX.Element {
  return (
    <div className={styles.nav}>
      <div className={`${styles.body} gap-8`}>
        {links.map((link: Link, i: number) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a href={href} className="text-3xl md:text-5xl">
                  {title}
                </a>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
