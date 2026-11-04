# Website Templates

Reusable website source templates for developers and coding agents. Each template is independently installable, editable and buildable into static files.

## Branches

`main` contains only this repository guide. Each `templates/<name>` branch contains one complete template. Do not merge template source into main or combine unrelated templates in one branch.

| Branch | Template |
| --- | --- |
| [templates/company](https://github.com/InYourWork/websites/tree/templates/company) | Company website: home, project collection and detail pages |

To begin, check out a template branch and read its README and AGENTS.md. To create a related template, branch from an existing template and replace its identity, content, design and metadata deliberately. Keep main independent.

```sh
git clone --branch templates/company https://github.com/InYourWork/websites.git
cd websites
pnpm install --frozen-lockfile
pnpm dev
```

## Basic structure

Use React and TypeScript with a static build. Versions, dependencies and commands belong in package.json and the generated pnpm-lock.yaml. Organize by responsibility; the example below describes the shared baseline, not an instruction to create empty files.

```text
README.md                 Usage and editing map
AGENTS.md                 Template authoring rules
DESIGN.md                 Visual guidelines
template.json             Template identity and capabilities
LICENSE                   Code license
ASSET-CREDITS.json         Asset sources and licenses
package.json
pnpm-lock.yaml
src/
  content/                Typed content and configuration
    locales/              Translated dictionaries
  pages/                  Pages and central registration
  sections/               Reusable content sections
  components/             Shared UI components
  styles/                 Design tokens and responsive styles
scripts/                  Static generation and validation
public/                   Local assets
tests/                    Behavioral and output checks
```

## Authoring requirements

- Keep templates independent of the host platform. Do not embed credentials, platform APIs, upload workflows, cloud scheduling or deployment procedures. Declare any required backend capability explicitly; never simulate successful business operations.

- Generate complete HTML for home, collection and content pages as appropriate to the template. Use React for browser interactions without requiring runtime SSR or SPA fallback. Support directory index.html and relative links/assets under a deployment subpath.

- Provide multilingual content by default. English is the initial default and uses root paths; other languages use configured prefixes, such as /zh/. Allow the default language to change through configuration. Preserve the current page when switching languages; do not duplicate default-language paths.

- Define content types independently of example translations. Separate shared business configuration from localized copy. Centralize page registration so routes, generation and navigation remain consistent when pages change.

- Keep page titles, descriptions, headings, links and image descriptions meaningful and localized. Document domain-dependent SEO configuration still required for a real deployment; do not invent a production domain.

- Store assets locally and record their provenance and licenses. Label demonstration content; do not invent client endorsements, certifications, performance claims or working contact details.

- Use design tokens and responsive layouts. Preserve native controls' accessibility and visible focus. Provide clear states for menus, filters and unconfigured features.

- Write documentation and explanatory comments in English followed by Chinese. Keep code identifiers, protocol fields and commands in English. Format code for readable, focused diffs.

- Keep rules in AGENTS.md, usage and modification instructions in README, and visual guidance in DESIGN.md. Do not duplicate implementation facts across documents. Describe concrete editing entry points for content, languages, branding and new pages.

- Exclude node_modules, dist, intermediate build output, credentials, local environment files and temporary validation artifacts from source commits. Keep a real pnpm lockfile and a license for reusable code.

## Verification

Each template should expose formatting, tests, type checking and build commands. At minimum, run the following before delivering changes:

```sh
pnpm format:check
pnpm test
pnpm typecheck
pnpm build
```

Validate generated pages, assets, internal links, anchor targets and language counterparts. Derive checks from configuration and content rather than fixed page counts, sample brands or language pairs.

Exercise common editing scenarios: change the default language, retain a single language, configure contact information, replace branding, add collection items and register a page. The company template provides pnpm test:edits for isolated build verification of these changes.

Verify desktop and mobile layouts and actual browser interactions separately. Build or static-check success does not establish visual correctness or working hydration. Report any verification that could not be completed.
