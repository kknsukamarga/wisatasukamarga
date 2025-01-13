import { motion } from "framer-motion";

interface OtherInfoProps {
  data: any;
}

const items = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

function OtherInfo({ data }: OtherInfoProps) {
  return (
    <motion.div initial="hidden" animate={"visible"} className="flex flex-col">
      <AnimatedText
        data={data?.location}
        className="spacing overflow-hidden text-white"
      />
      <AnimatedText
        data={data?.title}
        className="my-1 text-4xl font-semibold md:my-3 md:text-8xl md:leading-[100px]"
      />
      <AnimatedText data={data?.description} className="text-xs text-white" />
    </motion.div>
  );
}

export default OtherInfo;

function AnimatedText({
  data,
  className,
}: {
  data?: string;
  className?: string;
}) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.p className={`${className}`} variants={items} key={data}>
        {data}
      </motion.p>
    </span>
  );
}
