import {
  HeroSection,
  BeforeAfterBoard,
  DecisionPrinciples,
  CaseStudyGrid,
  RefactoringLog,
  IacHighlight,
  DrawhathaHighlight,
  ContactCta,
} from "@/components/home";
import {
  hero,
  beforeAfterBoard,
  principles,
  caseStudies,
  refactoringLog,
  iacHighlight,
  drawhathaHighlight,
  contactCta,
} from "@/data/homepage-content";

export default function Home() {
  return (
    <main data-testid="home-page" className="flex flex-col">
      <HeroSection data={hero} />
      <BeforeAfterBoard cards={beforeAfterBoard} />
      <DecisionPrinciples principles={principles} />
      <CaseStudyGrid caseStudies={caseStudies} />
      <RefactoringLog entries={refactoringLog} />
      <IacHighlight highlight={iacHighlight} />
      <DrawhathaHighlight highlight={drawhathaHighlight} />
      <ContactCta data={contactCta} />
    </main>
  );
}
