# Feature Spec Template

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

Use this template for every feature before building. Fill it in, review it, then build from it.

```markdown
# Spec: [Feature Name]

## Overview
[2-3 sentences: what this feature does and why it exists]

## User Story
As a [who], I want to [what], so that [why].

## Acceptance Criteria
- [ ] [criterion 1]
- [ ] [criterion 2]
- [ ] [criterion 3]

## Inputs
- [input 1]: [type, validation rules]
- [input 2]: [type, validation rules]

## Outputs
- [output 1]: [format, where it goes]

## API Endpoints (if applicable)
| Method | Path | Purpose | Auth Required |
|--------|------|---------|:-------------:|
| POST | /api/[resource] | [what it does] | Yes/No |

## Database Changes (if applicable)
- New model: [name] with fields [list]
- Modified model: [name] — added/changed [fields]

## Security Considerations
- [any auth, validation, or data protection needs]

## SADC Considerations
- [offline behavior, mobile-first needs, local payment integration]

## Dependencies
- [external service or package]

## Out of Scope
- [explicitly what this feature does NOT include]

## Estimated Complexity
Small / Medium / Large

## Stack Components
- Frontend: [components, pages]
- Backend: [API routes, server actions]
- Database: [models, migrations]
```

## How Specs Work in Studio OS

1. **Before building any feature** — fill in this template
2. **Present it to Tangi** — get approval before coding
3. **Build from the spec** — the spec is the contract
4. **Verify against acceptance criteria** — each criterion must be demonstrably met
5. **Update the spec** — if reality diverges from plan, update the spec to match

## Spec Rules

- Every feature gets a spec — no exceptions, no "it's too small"
- Specs are living documents — update them when requirements change
- Keep specs in `specs/` directory, named `[feature-name].md`
- One spec per feature — don't combine unrelated features
- If a spec grows beyond 2 screens — split it into smaller features

<!-- Tangison Studio — tangison.com -->
