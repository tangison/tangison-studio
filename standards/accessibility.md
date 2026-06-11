# Accessibility Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## WCAG AA — Minimum Standard

All Tangison projects must meet WCAG 2.1 Level AA as a baseline. No exceptions.

## Perceivable

- All non-text content has text alternatives
- Images: descriptive `alt` text for content images, `alt=""` for decorative
- Video: captions required, audio description recommended
- Color: never the only indicator of information (add icons, patterns, or text)
- Contrast: 4.5:1 minimum for normal text, 3:1 for large text
- Text resizable up to 200% without loss of content or function

## Operable

- All functionality available via keyboard
- Focus order follows logical reading order
- Focus visible on all interactive elements — never `outline: none` without replacement
- No keyboard traps
- Skip navigation link on every page
- Time limits: warn before timeout, allow extension
- Touch targets: minimum 44px × 44px on mobile

## Understandable

- Language of page declared in `<html lang="en">`
- Form labels: explicit `<label>` elements or `aria-label`
- Error messages: specific, actionable, associated with the field
- Navigation: consistent across pages
- No unexpected context changes on focus or input

## Robust

- Valid HTML — no parsing errors
- ARIA: use native HTML first, ARIA only when necessary
- ARIA roles, states, and properties must be correct
- Name, Role, Value: all interactive elements programmatically determinable

## SADC-Specific Accessibility

- Low-bandwidth: pages must be functional without JavaScript where possible
- Mobile-only users: design for people who have never used a desktop computer
- Touch-first: all interactions designed for thumbs, not mice
- Literacy: clear, simple language — avoid jargon and complex sentence structures
- Multilingual: structure for translation from day one
- Screen reader testing: TalkBack (Android) and VoiceOver (iOS)
- Low-end devices: test on Android Go devices with 2GB RAM

## Testing Checklist

- [ ] Keyboard navigation through entire page
- [ ] Screen reader announces all content and states
- [ ] Color contrast passes on all text
- [ ] Forms have labels, errors, and instructions
- [ ] Images have appropriate alt text
- [ ] Focus is always visible
- [ ] No auto-playing media
- [ ] Touch targets meet 44px minimum
- [ ] Page works at 200% zoom
- [ ] Works on Android Go with TalkBack

<!-- Tangison Studio — tangison.com -->
