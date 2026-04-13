import { Container } from "./container";

type NarrowPageProps = {
  children: React.ReactNode;
  className?: string;
};

export function NarrowPage({ children, className = "" }: NarrowPageProps) {
  return (
    <Container variant="narrow" className={`space-y-8 py-12 ${className}`.trim()}>
      {children}
    </Container>
  );
}
