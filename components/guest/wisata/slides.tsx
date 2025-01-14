import { DataShowcase } from "./showcase";
import SliderCard from "./slider-card";

interface SlideProps {
  datas: DataShowcase[];
}

export default function Slides({ datas }: SlideProps) {
  return (
    <div className="flex w-full gap-6">
      {datas.map((data) => {
        return <SliderCard key={data.img} data={data} />;
      })}
    </div>
  );
}
