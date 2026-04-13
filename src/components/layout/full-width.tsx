import type { ContainerVariant } from "./container";
import { Container } from "./container";

type FullWidthProps = {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
  contentClassName?: string;
};

const bleedClasses = "relative left-1/2 right-1/2 w-screen -translate-x-1/2";

export function FullWidth({
  children,
  variant = "wide",
  className = "",
  contentClassName = "",
}: FullWidthProps) {
  return (
    <section className={`${bleedClasses} not-prose ${className}`.trim()}>
      <Container variant={variant} className={contentClassName}>
        {children}
      </Container>
    </section>
  );
}
