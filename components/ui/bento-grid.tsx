import { cn } from "@/lib/utils";

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
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  author?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden p-4 flex flex-col justify-between bg-white dark:bg-black  dark:border-neutral-700 hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:border-white/[0.2] border-transparent space-y-4",
        className
      )}
    >
      <div className="relative w-full h-48 mb-4">{header}</div>

      <div className="flex items-start gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        by {author}
      </p>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        {description}
      </p>
    </div>
  );
};
