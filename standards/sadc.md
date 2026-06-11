# SADC Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## Connectivity

- Assume intermittent internet — build for offline-first, sync when connected
- All critical features must work without real-time server access
- Cache API responses locally with appropriate staleness thresholds
- Service worker for PWA when the project involves repeat visits
- Detect connection status and show clear offline indicators

## Mobile-First

- 375px is the base viewport — every layout starts here
- Touch targets: minimum 44px × 44px
- No hover-dependent interactions (hover is enhancement, not requirement)
- Test on: Samsung Galaxy A series (most common in SADC), iPhone SE
- Text: minimum 16px body, 14px for secondary — nothing smaller

## Bandwidth

- Maximum initial page load: 200KB compressed JavaScript
- All images: WebP format, compressed, lazy-loaded
- Prefer system fonts for body text — load display fonts only if critical to brand
- Skeleton screens over loading spinners — perceived performance matters more
- Avoid video autoplay — let users choose to consume heavy media

## Payments

- Never assume Stripe availability — it is not available in most SADC countries
- Default payment providers by country (see memory/global.md)
- Always offer a mobile money option alongside card payment
- Payment flows must work on 2G connections
- Display prices in local currency — never force USD conversion

## Communication

- WhatsApp Business API for client-facing communication (preferred over email)
- SMS as fallback for critical notifications
- Email as secondary channel, not primary
- All notification content must be concise — screen readers and small screens

## Languages

- Default: English
- Flag opportunities for Afrikaans, Oshiwambo, Setswana, Silozi, and other regional languages
- Never hardcode language strings — use i18n from the start if multilingual is possible
- Right-to-left not required for current SADC markets but structure CSS to allow it

## Data Sovereignty

- Prefer data storage within SADC when possible
- Flag any feature that sends user data to servers outside the region
- Document where data is stored and processed
- Consent mechanisms must be explicit and clear in plain language

## Legal Awareness

- Namibia: BIPA for business registration, NHBRC for construction, Labour Act for employment
- South Africa: POPIA for data protection, CPA for consumer rights
- Document applicable regulations in project memory per client jurisdiction

<!-- Tangison Studio — tangison.com -->
