import { merge } from "../utils/classMerge";

const variants = {
  base: "h-12",
  icon: "size-12",
  iconSmall: "size-8",
};

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: keyof typeof variants;
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "base",
  className = "",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={merge(
        "w-full flex items-center justify-center bg-green-100 rounded-lg text-white font-bold hover:cursor-pointer hover:bg-green-900 transition-colors disabled:cursor-progress disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
