import { BodyText } from "@/components/ui/typography/body-text";
import { Eyebrow } from "@/components/ui/typography/eyebrow";
import { SectionHeading } from "@/components/ui/typography/section-heading";

type CardHeaderProps = {
  body?: string;
  className?: string;
  eyebrow?: string;
  title: string;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CardHeader({ body, className, eyebrow, title }: CardHeaderProps) {
  return (
    <div className={joinClasses("flex flex-col gap-3", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <SectionHeading as="h3" className="text-2xl leading-tight sm:text-3xl sm:leading-tight">
        {title}
      </SectionHeading>
      {body ? <BodyText className="text-sm sm:text-base">{body}</BodyText> : null}
    </div>
  );
}
