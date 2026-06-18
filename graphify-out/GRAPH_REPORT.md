# Graph Report - Portfolio  (2026-06-18)

## Corpus Check
- 16 files · ~18,569 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 67 nodes · 69 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Portfolio Concepts & Documentation|Portfolio Concepts & Documentation]]
- [[_COMMUNITY_Package Configurations & Scripts|Package Configurations & Scripts]]
- [[_COMMUNITY_Development Dependencies & Tooling|Development Dependencies & Tooling]]
- [[_COMMUNITY_Core Application Layout & Navigation|Core Application Layout & Navigation]]
- [[_COMMUNITY_Production Dependencies & Libraries|Production Dependencies & Libraries]]
- [[_COMMUNITY_Projects and Image Rendering Components|Projects and Image Rendering Components]]
- [[_COMMUNITY_Application Bootstrapping & Mounting|Application Bootstrapping & Mounting]]
- [[_COMMUNITY_HeroJumbotron Visual Element|Hero/Jumbotron Visual Element]]
- [[_COMMUNITY_Interactive LoveCounter Component|Interactive LoveCounter Component]]

## God Nodes (most connected - your core abstractions)
1. `Naqi Haider Portfolio` - 7 edges
2. `scripts` - 5 edges
3. `React + Vite` - 3 edges
4. `Shopify Store Clone` - 3 edges
5. `App()` - 2 edges
6. `About()` - 2 edges
7. `Footer()` - 2 edges
8. `Hero()` - 2 edges
9. `Navbar()` - 2 edges
10. `ProgressiveImage()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Naqi Haider Portfolio` --references--> `Amazon RawJS Clone`  [INFERRED]
  README.md → src/components/Projects.jsx
- `Naqi Haider Portfolio` --references--> `Movie Ticket Booking System`  [INFERRED]
  README.md → src/components/Projects.jsx
- `Naqi Haider Portfolio` --references--> `YouTube Clone`  [INFERRED]
  README.md → src/components/Projects.jsx
- `Naqi Haider Portfolio` --references--> `Shopify Store Clone`  [INFERRED]
  README.md → src/components/Projects.jsx
- `graphify.md (Rules)` --rationale_for--> `Naqi Haider Portfolio`  [INFERRED]
  .agents/rules/graphify.md → README.md

## Import Cycles
- None detected.

## Communities (12 total, 3 thin omitted)

### Community 0 - "Portfolio Concepts & Documentation"
Cohesion: 0.22
Nodes (10): graphify.md (Rules), graphify.md (Workflows), Amazon RawJS Clone, Backend Development, Frontend Development, Movie Ticket Booking System, Naqi Haider Portfolio, Shopify Store Clone (+2 more)

### Community 1 - "Package Configurations & Scripts"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 2 - "Development Dependencies & Tooling"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 3 - "Core Application Layout & Navigation"
Cohesion: 0.18
Nodes (7): About(), Footer(), Hero(), Navbar(), ScrollToTop(), Skills(), App()

### Community 4 - "Production Dependencies & Libraries"
Cohesion: 0.33
Nodes (6): dependencies, framer-motion, lenis, react, react-dom, @studio-freight/lenis

### Community 6 - "Application Bootstrapping & Mounting"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **31 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Dependencies & Tooling` to `Package Configurations & Scripts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Production Dependencies & Libraries` to `Package Configurations & Scripts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Naqi Haider Portfolio` (e.g. with `graphify.md (Rules)` and `graphify.md (Workflows)`) actually correct?**
  _`Naqi Haider Portfolio` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._