# B2B Dynamic Form Post Design

## Goal
Create a post that proves web-product capability, not just blog styling, by embedding a full-width B2B dynamic onboarding form inside editorial content.

## Chosen Direction
Build one hardcoded showcase first instead of a reusable demo engine. The first scenario is a **B2B workspace onboarding form** for a platform-style product. The post should combine a readable case-study structure with a clearly product-like form experience that can expand beyond the article column.

## Visitor Outcome
A visitor should leave the page thinking:
- this can be a real SaaS onboarding flow
- complex conditional forms are handled well
- full-screen/full-width product UI can live inside the portfolio narrative
- the author can build product UX, not only marketing pages

## Experience Shape
1. **Post introduction (narrow content)**
   - explain the scenario in editorial form
   - frame the business context and design intent
2. **Full-width / viewport-style demo block**
   - a clearly product-like onboarding surface
   - large enough to feel like an actual app page inside the browser
3. **Breakdown section (narrow content)**
   - explain dynamic behavior, validation, and UX decisions
   - mention stack and implementation choices

## Demo Scenario
The first demo is a **B2B workspace onboarding form**.

### Form sections
- Company profile
  - company name
  - industry
  - team size
- Workspace setup
  - primary use case
  - departments / jobs to be done
  - invited seats
- Integrations
  - select tools such as Slack, HubSpot, Salesforce
  - reveal tool-specific configuration fields when selected
- Compliance
  - toggle security / compliance requirements
  - reveal advanced requirements when enabled
- Live summary panel
  - update immediately as the form changes

## Dynamic Behavior
The form should visibly adapt to user input:
- team size changes downstream questions
- selected use case changes recommended / required fields
- selected integrations reveal nested configuration inputs
- compliance toggle reveals B2B security requirements
- submit action validates and moves to a review / success state with no backend

## Technical Approach
- Use a **client component** for the form experience
- Use **React Hook Form** for state and interaction control
- Use **Zod** for schema validation
- Use `@hookform/resolvers/zod` to connect schema validation to form state
- Keep the demo **frontend-only** for the first iteration
- Use mock data / mock success messaging rather than an API

## Layout Principles
- Preserve normal article readability for the narrative sections
- Allow the demo block to escape the narrow reading column
- The demo should feel close to a real application screen in the browser viewport
- The layout should highlight that different post scenarios are possible in the future

## Boundaries
This version should **not** include:
- backend submission
- persistence
- authentication
- reusable JSON-driven form engine
- generic post-scenario framework beyond what is needed for this one showcase

## Acceptance Criteria
1. A post contains a clearly visible full-width or near-full-screen demo section.
2. The demo feels like a realistic B2B onboarding screen.
3. Fields change based on prior answers.
4. Validation is visible and polished.
5. The page still reads like a case study / product post.
6. The page demonstrates serious web-app UX capability inside a portfolio context.

## Follow-up Potential
After this first hardcoded showcase, future post scenarios can branch into:
- pricing configurators
- admin settings flows
- dashboard filters
- multi-step checkout
- internal operations tools
