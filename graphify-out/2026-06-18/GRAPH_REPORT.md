# Graph Report - .  (2026-06-18)

## Corpus Check
- Corpus is ~17,889 words - fits in a single context window. You may not need a graph.

## Summary
- 62 nodes · 67 edges · 14 communities (8 shown, 6 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.85)
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
- [[_COMMUNITY_Scroll-To-Top Navigation Utility|Scroll-To-Top Navigation Utility]]
- [[_COMMUNITY_Skills & Expertise Section|Skills & Expertise Section]]

## God Nodes (most connected - your core abstractions)
1. `Naqi Haider Portfolio` - 7 edges
2. `scripts` - 5 edges
3. `Shopify Store Clone` - 3 edges
4. `App()` - 2 edges
5. `About()` - 2 edges
6. `Footer()` - 2 edges
7. `Header()` - 2 edges
8. `Jumbo()` - 2 edges
9. `LoveCounter()` - 2 edges
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

## Communities (14 total, 6 thin omitted)

### Community 0 - "Portfolio Concepts & Documentation"
Cohesion: 0.20
Nodes (10): graphify.md (Rules), graphify.md (Workflows), Amazon RawJS Clone, Backend Development, Frontend Development, Movie Ticket Booking System, Naqi Haider Portfolio, Shopify Store Clone (+2 more)

### Community 1 - "Package Configurations & Scripts"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 2 - "Development Dependencies & Tooling"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 3 - "Core Application Layout & Navigation"
Cohesion: 0.43
Nodes (3): About(), Footer(), Header()

### Community 4 - "Production Dependencies & Libraries"
Cohesion: 0.33
Nodes (6): dependencies, framer-motion, lenis, react, react-dom, @studio-freight/lenis

## Knowledge Gaps
- **27 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Dependencies & Tooling` to `Package Configurations & Scripts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Production Dependencies & Libraries` to `Package Configurations & Scripts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Naqi Haider Portfolio` (e.g. with `graphify.md (Rules)` and `graphify.md (Workflows)`) actually correct?**
  _`Naqi Haider Portfolio` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `Shopify Store Clone` (e.g. with `Naqi Haider Portfolio` and `Backend Development`) actually correct?**
  _`Shopify Store Clone` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._