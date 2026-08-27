// Every sentence here is the site's own, already-published copy or the plain
// facts behind it. The page this replaced was written in a vocabulary that
// appears nowhere in the canon — "rescue practice", "team snapshot", "field
// notes", "start with diagnosis" — and claimed a team where the home page says
// "an app of my own". A site that sells checking whether a claim is true cannot
// give two answers to how many people it is.

export const about = {
  eyebrow: "About",

  // wakeymoment is the company, fmv is the service. The service leads wherever
  // a visitor is deciding whether to buy; this page is where the company is
  // allowed to be the subject, because the question here is who is behind it.
  headline: "One engineer, reading your stack from the outside",

  lede:
    "fmv is the review service. wakeymoment is the company behind it, and I am the person who does the work — there is no team to hand your codebase to, and no account manager between you and the reading.",

  // src/data/proposal-content.ts § whyMe. The same three grounds the home page
  // stands on, stated once rather than twice in different words.
  grounds: {
    caption: "What I bring to it",
    items: [
      "Six years of engineering.",
      "An app of my own shipped to the App Store.",
      "Front-end lead on a public-sector platform.",
    ],
  },

  method: {
    caption: "Why the method is public",
    body: "I publish the method before anyone pays for it — the checklist I work from, the way I read a stack, and the writing behind both. There are no testimonials on this site and there will not be until the first paid audit, so what you get instead is the work itself, in the open, to judge before you commission anything.",
  },

  // Named because a proposal names its exclusions. The same instinct as § 05.
  boundaries: {
    caption: "What this is not",
    items: [
      "Not an agency, and not a team you are being introduced to.",
      "Not a formal security certification or a penetration test.",
      "Not a rewrite — the review tells you what to fix, in what order.",
    ],
  },

  links: [
    { label: "The method, in public", href: "https://github.com/orangec-at/vibe-hardening" },
    { label: "What I have published", href: "/posts" },
    { label: "The sample report", href: "/posts/ai-mvp-technical-debt-audit-sample-report" },
  ],

  ctaLabel: "Get an independent review",
  ctaHref: "/contact",
} as const;
