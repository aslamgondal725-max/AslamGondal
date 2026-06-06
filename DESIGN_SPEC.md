# Redesign spec — Monochrome Editorial

This Next.js site is being rebuilt to match a finished design. Direction: **editorial / print-inspired scientific portfolio. Ink on warm paper. Fully monochrome. Zero gradients. No glow, no glass, no shadows for decoration.**

## Hard rules (do not violate)
1. **No gradients anywhere** (no `bg-gradient-*`, no CSS `linear-gradient`/`radial-gradient`). 
2. **No em dashes (—) in any text content.** Use commas, periods, or "to" for ranges (e.g. "2019 to 2022"). En dashes also disallowed; rewrite.
3. **No dark mode.** Theme is forced light. Remove `dark:` utility classes you touch and any theme-toggle UI. Do not add new `dark:` classes.
4. **No color accent.** Everything is ink/paper/line tones. No blue, no green, no slate-on-dark.
5. Keep all data wiring intact (props, JSON imports, getStaticProps, links, hrefs). Only change presentation/markup/classes. Preserve all real content/links from the JSON.

## Tokens (Tailwind, already configured)
- Backgrounds: `bg-paper` (#f3efe6 page), `bg-paper-deep` (#ece7da alt sections), `bg-paper-card` (#f8f5ee cards)
- Text: `text-ink` (#1a1813), `text-ink-soft` (#4c473d body), `text-ink-mut` (#8c8676 muted/labels)
- Hairlines: `border-line` (#d6cfbf), `border-line-strong` (#c2b9a4)
- Fonts: `font-serif` (Fraunces, for all headings + emphasis italics), `font-sans` (Hanken Grotesk, body, default)
- Helpers in globals.css you can reuse: `.eyebrow`, `.section-heading`, `.section-subtext`, `.soft-chip`, `.cta-link`, `.surface-card`, `.surface-card-hover`, `.page-hero`, `.btn-ink`, `.btn-ghost`, `.panel-accent`

## Visual language
- **Headings**: Fraunces serif, weight 500, tight tracking. Big and confident. Emphasis words use italic serif in ink (never colored).
- **Eyebrows / section labels**: `.eyebrow` — uppercase, letter-spacing 0.2em, `text-ink-mut`, small. Use sparingly.
- **Section structure**: editorial. A wide left label gutter (~200px) holding a number ("01") + label, then content. On `<lg` collapse to stacked. Separate items with hairline rules (`border-t border-line`) rather than boxed cards where possible. Alternate section backgrounds between `bg-paper` and `bg-paper-deep` for rhythm.
- **Cards/tags**: hairline only. `border border-line`, `rounded-sm` or `rounded-md`, `bg-paper-card`. Hover = border darkens (`hover:border-ink/40`) and/or a 1px translate. No drop shadows, no scale pop.
- **Buttons**: primary = `.btn-ink` (solid ink fill, paper text). secondary = `.btn-ghost` (hairline, fills ink on hover). 
- **Numbers / indices**: large Fraunces serif in `text-line-strong` (faint) as decorative figure numbers (e.g. project "01").
- **Images / logos**: grayscale (`grayscale`), `mix-blend-multiply` for logos on paper, reveal to full on hover. Photos: `grayscale contrast-[1.04]`.
- **Motion**: subtle. Keep existing reveal/scroll behavior (`rr-anim`/`rr-in`/`rr-out`) where present. Hover: small `-translate-y-0.5` or underline grows. No bouncy/scale effects.

## Nav (Header) target
Sticky top bar, `bg-paper border-b border-line`, height ~74px. Left: wordmark "Muhammad Aslam." in Fraunces serif (the period can be ink). Right: text nav links (Hanken, `text-ink-soft`, hover `text-ink`, active gets a 1.5px ink underline). The **Contact** item is a solid ink button: use `.btn-ink` sizing (px-6 py-3-ish, but trim to ~px-5 py-2.5 for nav height), `whitespace-nowrap`, `flex-none` so it never shrinks/clips. Remove the theme toggle entirely. Mobile: hamburger toggles a stacked menu (`bg-paper border-b border-line`).

## Footer target
`border-t border-line`, `bg-paper`. Left: wordmark + one-line description in `text-ink-mut`. Right: text links (CV, Twitter, LinkedIn, Email) `text-ink-soft hover:text-ink`. Bottom hairline row: copyright + location, `text-ink-mut text-xs`. No social-icon chips with borders/shadows; plain text links are fine, or minimal.

## Reference content (already in /components/data/*.json — use the JSON, this is just orientation)
- Name: Muhammad Aslam, M.Sc. Role: Research Fellow, FMZ, Julius-Maximilians-Universität Würzburg, Germany.
- Sections on home: About/bio, Focus areas, Education (4 degrees), Teaching (TA 2019 to 2022), Affiliations (8 logos), Recent readings (rotating), Latest blog teaser, Contact.
- Email: Aslamgondal725@gmail.com. CV: /cv.pdf. Twitter: x.com/aslamgondal5. LinkedIn: linkedin.com/in/muhammad-aslam-61884110b.

When in doubt, choose restraint. Hairlines over boxes. Type hierarchy over color. Whitespace over ornament.
