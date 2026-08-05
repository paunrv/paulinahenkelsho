# Notes — Product Architecture v2

## Discovery

Notes are not different products.

They are simply different ways of thinking.

Perspectives must not feel more important than Building or Field Notes.

They all belong to the same notebook.

## Product Decision

Remove Perspectives as a top-level navigation item.

Create a single section: **Notes**.

Inside Notes, organize every publication by category.

Categories are part of the content architecture — not the site architecture.

## Final Navigation

Home · Notes · About · CV

## Categories (equal)

### Building

How products are built. Product Discovery. UX. AI. Systems. Decision making. Real projects.

### Field Notes

Observations from real life. Hospitals. Open water. Travel. Taekwondo. Wine country. Industrial visits. People. Moments.

### Perspectives

Long-form reflections born from lived experience. Technology. Environmental responsibility. Industry. Latin America. Education. Ethics. Complex systems.

Not opinion pieces — thoughtful reflections grounded in real experience.

Perspectives should never have more visual importance than the other categories.

## User Experience

Visitors should never feel like they are entering different sections.

They should feel like they are browsing the same notebook.

Categories simply help organize the shelf.

## Reading Experience

Notes are designed for slow reading.

Reading takes priority over visual rhythm.

Reduce excessive vertical spacing.

Create natural paragraphs.

Separate only when the scene, emotional tone, or idea changes — or an important sentence deserves silence.

Avoid breaking after every sentence.

Optimize for immersion.

The reading experience should feel closer to a magazine or a printed essay than a landing page.

## Visual Hierarchy

Category labels should be subtle and equal:

FIELD NOTE · BUILDING · PERSPECTIVE

Same typography. Same size. Same weight.

## Philosophy

Projects demonstrate what Paulina builds.

Notes demonstrate how Paulina thinks.

The website exists to preserve both.

## Editorial Principle

Every publication belongs to Notes.

Some happen while building.

Some happen while observing.

Some happen while reflecting.

All of them belong to the same notebook.

That unity is more important than the category itself.

## Language

Publish each note in the language in which it was born.

Never translate emotions, memories, or observations.

## Implementation

- Content lives in `content/notes/`
- Categories: `Building` | `Field Notes` | `Perspectives`
- Display labels via `formatCategoryLabel`: Building · Field Note · Perspective
- Routes: `/notes`, `/notes/[slug]`
- Legacy `/perspectives` and `/perspectives/:slug` redirect permanently to Notes
