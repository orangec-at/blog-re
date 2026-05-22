import { BodyText, DisplayHeading, Eyebrow, SectionHeading } from "@/components/ui/typography";

type SectionIntroProps = {
  aside?: string;
  body: string;
  className?: string;
  eyebrow: string;
  title: string;
  titleAs?: "h1" | "h2";
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SectionIntro({ aside, body, className, eyebrow, title, titleAs = "h2" }: SectionIntroProps) {
  return (
    <div className={joinClasses("grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.45fr)]", className)}>
      <div className="max-w-3xl space-y-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        {titleAs === "h1" ? (
          <DisplayHeading className="text-5xl sm:text-6xl [text-wrap:balance]">{title}</DisplayHeading>
        ) : (
          <SectionHeading className="[text-wrap:balance]">{title}</SectionHeading>
        )}
        <BodyText>{body}</BodyText>
      </div>

      {aside ? (
        <div className="self-end border-t border-[#d6d9fc] pt-4">
          <BodyText className="text-sm sm:text-base">{aside}</BodyText>
        </div>
      ) : null}
    </div>
  );
}
