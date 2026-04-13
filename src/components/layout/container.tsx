type ContainerProps = {
  children: React.ReactNode;
  variant?: "narrow" | "wide";
  className?: string;
};

const base = "mx-auto px-4 sm:px-6 lg:px-8";
const variants = {
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
};

export function Container({ children, variant = "wide", className = "" }: ContainerProps) {
  const widthClass = variants[variant];
  return <div className={`${base} ${widthClass} ${className}`}>{children}</div>;
}
