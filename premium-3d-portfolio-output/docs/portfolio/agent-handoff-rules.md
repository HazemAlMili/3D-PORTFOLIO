# Agent Handoff & Operational Execution Rules Specification

This specification establishes the strict operational guardrails and automated QA gating criteria for all AI development agents and sub-agents executing subsequent milestones across this project repository.

## 1. Immutable Configuration Variables (Input Layer Freezing)
To completely prevent generative drift, narrative shifting, or layout dilation, all deliverables generated during Phase 0 are classified as **Immutable Core Configurations**. Downstream agents are strictly prohibited from modifying or interpreting these parameters:

* **Locked Creative Direction Configuration:** `docs/portfolio/direction.md`
* **Locked Visual Boundaries Config:** `docs/portfolio/reference-board.md`
* **Locked Functional Architecture Tiers:** `docs/portfolio/scope-tiers.md`
* **Locked Production Project Manifest:** `docs/portfolio/project-selection.md`
* **Locked Data Proof Inputs:** `docs/portfolio/case-study-inputs.md`
* **Locked Front-Facing Text Blocks:** `docs/portfolio/positioning-copy.md`

---

## 2. Strict Identity Guardrails & Professional Non-Goals
Downstream agents must strictly preserve the user's authentic professional profile boundaries. Any alignment mutation will trigger an automatic quality compilation failure:

* **Programmatic Title Lock:** The system owner is **Hazem Mahmoud Al-Melli**, exclusively branded as a **Lead Frontend Developer**, **Web Developer**, and **Technical Project Lead/IT Department Head**.
* **Strategic Background Context:** Technical achievements must be framed as directly reinforced by a formal **Business Administration** framework to emphasize lifecycle optimization, leadership capability, and product execution.
* **Absolute Non-Goal Identity Exclusion:** Agents are **strictly prohibited** from introducing descriptions, metrics, caricatures, or titles identifying the user as a "DevOps Engineer" or "Cloud Infrastructure Operations Engineer". All backend integrations must be described cleanly as data layer linkages mapped directly onto frontend client systems.

---

## 3. Standardized Downstream QA Gate Rules
Every subsequent task ticket must end with exactly one of the three definitive status outputs. No intermediate or ambiguous conclusions are permitted:

### State A: `PASS`
Use exclusively when the milestone requirements are 100% completed, verified via typechecking/linting/build loops, and no conditions remain unresolved.
* **Required Output Layout Format:**
  ```txt
  PASS — [Ticket ID] complete.
  A. Deliverables created: [File paths]
  B. Validation: [Explicit testing and verification metrics]
  C. Scope confirmation: [Zero drift confirmation codes]
  ```

### State B: `PASS WITH CONDITIONS`
Use only when core code/assets exist and are fully operational, but approved external items remain pending (such as final high-res graphical updates or client hosting validations).
* **Required Output Layout Format:**
  ```txt
  PASS WITH CONDITIONS — [Ticket ID] complete.
  A. Deliverables created: [File paths]
  B. Validation: [Testing outcomes]
  C. Conditions remaining: [Explicit pending parameters]
  D. Scope confirmation: [Zero drift confirmation codes]
  ```

### State C: `QA BLOCKED`
Returned immediately if required tooling configurations are missing, deliverables are placeholder-only, or code integration patterns bypass locked Phase 0 constraints.
* **Required Output Layout Format:**
  ```txt
  QA BLOCKED — [Ticket ID] cannot be completed.
  A. Exact blockers: [Detailed description of structural friction]
  B. Files created / Not created: [Path tracking updates]
  C. Recovery instruction: [Actionable path forward]
  D. Scope confirmation: [Zero placeholder contamination verified]
  ```

---

## 4. Downstream Deliverable Layout Enforcement
Every asset or development ticket execution must output a matching suite of supporting management documents in the root destination tree:

1. `[Ticket-ID]-main-report.md`: Contains executive performance summaries, technical decisions, and accessibility parameters.
2. `[Ticket-ID]-handoff-notes.md`: Outlines downstream implementation impact matrices and structural handoff rules.
3. `[Ticket-ID]-validation-summary.md`: Details rigorous file existence, lint testing compilation states, and error checks.
