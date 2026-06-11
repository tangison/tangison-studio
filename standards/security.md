# Security Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## Never Commit

- API keys, tokens, or secrets of any kind
- `.env` files (only `.env.example` with placeholder values)
- Database connection strings with real credentials
- Private keys, certificates, or auth tokens
- User data, PII, or test data that resembles real people

## Environment Variables

- All secrets via environment variables only
- `.env.example` must list every required variable with a placeholder
- `.env` must be in `.gitignore`
- Never log environment variable values
- Validate env vars at startup — fail fast if missing

## Authentication

- Use Better Auth — never roll your own auth
- All authenticated routes protected by middleware
- Session tokens: httpOnly, secure, sameSite=strict
- Password requirements: minimum 8 characters, no complexity theater
- Rate limit login attempts: 5 per minute per IP

## Input Validation

- All user input validated with Zod schemas on both client and server
- Server actions validate before any database operation
- File uploads: validate type, size, and content (not just extension)
- SQL: always use Prisma parameterized queries — never raw SQL with interpolation
- XSS prevention: never render user HTML without sanitization

## API Routes

- Rate limit all public endpoints
- Validate request body with Zod before processing
- Never expose internal error details to clients
- CORS: explicit allowlist, never `*`
- All mutations require CSRF protection

## Database

- Prisma as ORM — never raw SQL unless absolutely necessary
- Migrations version controlled in `prisma/migrations/`
- Seed scripts for development data only — no production seeds
- Backup strategy documented in project memory

## Dependencies

- Audit dependencies on every install: `bun audit`
- No packages with known critical vulnerabilities
- Lock file committed (`bun.lock`)
- Minimal dependency count — every package must justify its inclusion

## SADC-Specific

- Flag any feature that sends data to servers outside SADC without explicit consent
- Offline-first: local data storage for sensitive information when possible
- WhatsApp Business API: never store message content longer than 24 hours
- Mobile money: never log payment credentials or transaction PINs

<!-- Tangison Studio — tangison.com -->
