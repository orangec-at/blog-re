# Button, Chip, and Mobile App Bar Design Doc

## Goal
Add proper atomic button and chip components to the design system, then use them to build a mobile floating app bar that can replace the current header on small screens.

## Why this exists
The current UI has ad hoc button variants and a single pill-like tag component. That is not enough for a reusable system.

This slice should solve three related problems:
- establish a real atomic button surface
- establish both informational and interactive chips
- make the mobile navigation feel intentional instead of simply hiding desktop navigation

## Scope
Included:
- atomic `button.tsx` expansion
- atomic `chip.tsx`
- `ChipGroup`
- mobile floating app bar
- adoption in the header and design-system preview

Not included:
- full desktop header redesign
- route-aware active state logic for every page
- animation-heavy nav behavior

## Design principles
### 1. Buttons are action atoms
Buttons should express action hierarchy, not page-specific styling.

Target roles:
- primary
- secondary
- ghost
- text-link

Common concerns:
- button or anchor rendering
- size variants
- optional icon slots
- consistent focus behavior

### 2. Chips are state atoms
Chips are not just tags. They need to support:
- informational labels
- selectable filters
- quick-navigation pills

Target roles:
- `Chip`: static information chip
- `InteractiveChip`: clickable/selectable chip
- `ChipGroup`: wraps related chips with spacing and semantics

### 3. Mobile app bar should feel native to the system
The mobile replacement for the header should not introduce a one-off style language.

It should be built from:
- a floating surface
- grouped interactive chips
- one high-priority action

### 4. Keep the API small
Do not create a universal “everything” component. Better to have a few focused atoms with clear responsibilities.

## Button design
### Variants
- `primary`: orange fill, highest CTA emphasis
- `secondary`: dark fill, strong but not primary
- `ghost`: light surface, bordered
- `text`: inline underlined action, compact

### Sizes
- `sm`
- `md`
- `lg`

### Behaviors
- works as link or button
- optional leading/trailing icon slot
- disabled style for button mode

## Chip design
### Informational chip
Use for tags, highlights, stack labels, topical markers.

Features:
- neutral, accent, and inverse tones
- optional compact size

### Interactive chip
Use for:
- nav shortcuts
- filters
- segmented choices
- mobile app bar actions

Features:
- selected/unselected states
- icon support
- link or button mode
- optional badge/count text

## Mobile floating app bar
### Role
Replace the desktop header on mobile with a lighter, more tappable control surface.

### Structure
- fixed near bottom of viewport
- rounded floating panel
- home/primary navigation chips
- one emphasized diagnosis action

### Content
Initial mobile actions:
- Services
- Proof
- About
- Contact

The diagnosis CTA can either be the selected/high-emphasis chip or a distinct primary button inside the bar.

Recommended direction:
- nav items as interactive chips
- diagnosis as a small primary button within the same floating shell

## Adoption targets
### Header
- desktop header stays largely intact
- mobile layout switches to floating app bar

### Design system page
- show all button variants
- show informational chips
- show interactive chips
- show the floating app bar in preview

## Success criteria
This slice is successful when:
1. buttons and chips exist as clear atomic entrypoints
2. informational and interactive chips are both supported
3. mobile header has a real floating replacement
4. the design-system page demonstrates the new atoms and app-bar pattern
