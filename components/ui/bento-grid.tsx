import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  author,
  category,
  date,
  link,
  view_count,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  author?: string;
  category: string;
  date?: string;
  link: string;
  view_count?: number;
}) => {
  return (
    <Link
      className={cn(
        "relative rounded-xl overflow-hidden p-3 flex flex-col justify-between bg-white dark:bg-black dark:border-neutral-700 hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:border-white/[0.2] border-transparent space-y-1 border border-[#7E7E7E] cursor-pointer",
        className
      )}
      href={link}
    >
      <div className="relative w-full h-48 mb-4">{header}</div>

      <div className="flex items-center justify-between w-full">
        <Badge
          variant="default"
          className="w-fit bg-orange-secondary/65 -ml-1 text-gray rounded-full hover:bg-orange-secondary/65 hover:text-gray"
        >
          {category.replace("_", " ")}
        </Badge>

        <p className="text-xs  rounded-md bg-gray px-3 py-1 text-white">
          Dibaca {view_count}x
        </p>
      </div>

      <div className="flex flex-col items-start gap-2 mt-1">
        {/* {icon} */}
        <p className="text-sm opacity-50">{date}</p>

        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
      </div>

      {description}
    </Link>
  );
};
