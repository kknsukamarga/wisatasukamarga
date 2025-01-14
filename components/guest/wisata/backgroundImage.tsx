import { CurrentSlide, DataShowcase } from "./showcase";
import { motion } from "framer-motion";

interface BackgroundImageProps {
  transitionData: DataShowcase;
  currentSlide: CurrentSlide;
}

function BackgroundImage({
  transitionData,
  currentSlide,
}: BackgroundImageProps) {
  return (
    <>
      {/* backround transition image */}
      {transitionData && (
        <motion.img
          key={transitionData.img}
          layoutId={transitionData.img}
          alt={transitionData.title}
          transition={{
            opacity: { ease: "linear" },
            layout: { duration: 0.6 },
          }}
          className="absolute left-0 top-0 z-10 brightness-50 inset-0 w-full h-full object-cover"
          src={transitionData.img}
        />
      )}

      {/* backround image */}
      <motion.img
        alt={currentSlide.data.title + " background"}
        key={currentSlide.data.img}
        src={currentSlide.data.img}
        className="absolute left-0 top-0 w-full h-full object-cover brightness-50"
      />
    </>
  );
}

export default BackgroundImage;
