# Visual / Material / Color Tokens
## Cinematic 3D Full Stack Developer Portfolio
## Concept: The System Behind Every Screen

Status: Phase 0 Draft
Purpose: Visual source of truth for color, materials, lighting, screen glow, and forbidden treatments.
Implementation Status: Documentation only — no runtime material code yet.

---

# 1. Visual Creative Lock

* The visual system must feel premium, dark, cinematic, technical, controlled, and software-engineering focused.
* The visitor should feel that every screen is only the surface of a deeper engineered system.
* The visual direction must not become cyberpunk noise, a game UI, a generic sci-fi room, or a decorative 3D template.

---

# 2. Color Tokens

| Token | Hex | Role | Usage | Must Avoid |
|---|---|---|---|---|
| `color.blackVoid` | `#05070A` | Primary environment base | Deep background, outer 3D space, opening darkness | Do not use as unreadable text background without contrast layer |
| `color.graphite` | `#0B0F14` | Main dark surface | Device surroundings, large dark panels, scene base | Do not over-light into grey |
| `color.charcoalMetal` | `#151B22` | Metal body base | Device bodies, frames, dark mechanical surfaces | Do not make it look plastic |
| `color.darkBlueSystem` | `#081A2A` | Technical depth | Subtle background gradients, architecture depth | Do not turn into bright blue neon |
| `color.smokedGlass` | `#1E2A33` | Glass/screen tint | Screen glass, translucent panels, overlays | Do not reduce text contrast |
| `color.cyanData` | `#38D6FF` | Primary data accent | Data lines, API pulses, active system routes | Do not overuse everywhere |
| `color.blueSignal` | `#2F80ED` | Secondary signal accent | Secondary links, quiet glow, scene connectors | Do not make all CTAs blue if hierarchy suffers |
| `color.whiteText` | `#F4F7FA` | Primary readable text | Main headings, key labels, CTAs | Do not use on bright glow without backing |
| `color.mutedText` | `#A7B0BC` | Secondary text | Descriptions, supporting labels | Do not use below accessible contrast |
| `color.lineMuted` | `#34404D` | Subtle line work | Grids, inactive nodes, quiet outlines | Do not make it visually noisy |
| `color.warmHighlight` | `#D8A84F` | Rare premium highlight | Seal moment, one key CTA accent, final payoff | Do not use as common decoration |
| `color.errorRed` | `#FF5C5C` | Error/failure state only | Fallback warnings, failed status if needed | Do not use decoratively |
| `color.successGreen` | `#51D88A` | Success/ready state only | Approved/ready state if needed | Do not use as random glow |

*Rule:* Cyan/blue accents are for system/data behavior. Warm highlight is rare and reserved for premium payoff moments.

---

# 3. Color Usage Rules

1. The base experience must remain dark and premium.
2. Accents must communicate system activity, not decoration.
3. White text must be used for primary readability.
4. Muted text must only be used where contrast remains readable.
5. Cyan should guide data flow and interaction states.
6. Warm highlight should appear rarely: seal reveal, one premium CTA, or final moment.
7. Avoid excessive glow stacking.
8. Avoid rainbow gradients.
9. Avoid purple-dominant lighting.
10. Avoid bright toy-like color palettes.

---

# 4. Material Presets

| Material Token | Base Color | Finish | Intended Use | Visual Rule | Must Avoid |
|---|---|---|---|---|---|
| `material.darkMatteMetal` | `color.charcoalMetal` | matte / low roughness variation | device bodies, frames, backend core structures | must feel premium and solid | chrome, plastic, toy look |
| `material.smokedScreenGlass` | `color.smokedGlass` | semi-reflective glass | device screens before entry | reflections must be subtle | mirror-like surfaces |
| `material.activeScreenGlow` | `color.cyanData` + `color.whiteText` | emissive but controlled | active screens, portal-ready states | glow must frame content, not overpower it | heavy bloom, unreadable text |
| `material.inactiveScreen` | `color.graphite` | dark glass/off state | inactive devices in background | should recede visually | competing with active scene |
| `material.dataLine` | `color.cyanData` | thin emissive line | API/data routes, scene transfer paths | lines must be thin and purposeful | dense spaghetti lines |
| `material.systemNode` | `color.darkBlueSystem` | soft-lit block | architecture nodes, backend services | readable silhouette | random cubes with no labels |
| `material.databaseCore` | `color.darkBlueSystem` + `color.blueSignal` | layered subtle emissive rings | DB motif, system core | must map to database/data meaning | generic sci-fi reactor |
| `material.sealMetal` | `color.charcoalMetal` + `color.warmHighlight` | premium engraved metal | opening seal/stamp | warm highlight only on impact/reveal | cartoon stamp, gold overload |
| `material.overlayPanel` | `#0B0F14CC` | translucent UI panel | readable DOM overlays if needed | must protect readability | glassmorphism blur abuse |
| `material.focusRing` | `color.cyanData` | accessible outline | keyboard focus states | must be clearly visible | invisible focus or decorative-only hover |

---

# 5. Screen and Portal Surface Rules

1. Screens are portals, not decorations.
2. A screen can be inactive, waking, active, portal-entered, or exited.
3. Inactive screens should be dark and quiet.
4. Active screens may glow softly but must preserve text readability.
5. Portal entry must be visually connected to the assigned transition variant.
6. Reflections should be subtle and must not hide content.
7. Scanline or distortion effects must be rare and controlled.
8. Screens must never look like random animated billboards.

### Screen State Visual Treatment
| Screen State | Visual Treatment | Usage |
| ------------ | -------------------------------------------- | --------------------- |
| `inactive` | dark glass, very low glow | background devices |
| `wake` | soft edge glow, subtle boot line | before entry |
| `active` | readable content, controlled glow | current scene |
| `portal` | transition effect linked to assigned variant | entry/exit moment |
| `exited` | content dims, device returns to environment | handoff to next scene |

---

# 6. Lighting Rules

1. Lighting must feel cinematic and controlled.
2. Use dark environment lighting with selective highlights.
3. Active screen glow can motivate local light.
4. Avoid lighting every object equally.
5. Avoid excessive bloom.
6. Avoid harsh white overexposure.
7. Avoid random colored lights.
8. Scene 07 can be deeper and more dimensional, but must not become a generic reactor.
9. Scene 08 should calm the lighting and prioritize final readability.

### Lighting Categories
| Light Token | Usage | Rule |
| ----------------------- | ------------------------- | -------------------------- |
| `light.environmentLow` | base environment | dark, low intensity |
| `light.screenMotivated` | active device glow | local and soft |
| `light.dataAccent` | data lines/API pulses | thin and directional |
| `light.sealImpact` | opening impact | short-lived, warm/cyan mix |
| `light.finalSync` | final contact composition | calm, balanced, readable |

---

# 7. Typography Color Rules

1. Primary text uses `color.whiteText`.
2. Secondary text uses `color.mutedText` only on dark backgrounds.
3. Technical labels may use `color.cyanData` sparingly.
4. CTAs must have stronger contrast than background labels.
5. Text must never sit directly on heavy glow without a readability layer.
6. No low-contrast grey-on-grey text.
7. No tiny text inside mobile scene.

### Typography Token Guide
| Text Role | Token | Usage |
| ------------------- | --------------------- | -------------------------------------- |
| Primary heading | `color.whiteText` | name, scene headline, final CTA |
| Secondary copy | `color.mutedText` | supporting explanations |
| Technical label | `color.cyanData` | API, DB, deployment, responsive labels |
| Rare premium accent | `color.warmHighlight` | seal payoff or one final highlight |
| Focus/interaction | `color.cyanData` | keyboard focus, active nav |

---

# 8. Background System Elements

| Element | Visual Treatment | Purpose | Must Avoid |
| ------------------- | ------------------------------------ | --------------------------------- | ------------------------ |
| Data lines | thin cyan/blue trails | connect devices and system layers | dense noisy webs |
| Code fragments | short, subtle, semi-transparent | technical atmosphere | Matrix/code-rain cliché |
| Architecture nodes | labeled dark blocks with light edges | show system thinking | unlabeled random cubes |
| API pulses | directional moving highlights | show flow between layers | random blinking |
| Database motif | rings/cylinders/stacks | represent data layer | generic sci-fi core |
| Grid surfaces | faint graphite line grid | depth and technical space | visible spreadsheet look |
| Loading states | minimal boot/status hints | show system initialization | fake dashboards |
| Accessibility hints | subtle but readable indicators | reduced motion/fallback awareness | decorative-only icons |

---

# 9. Scene-Level Visual Application

| Scene | Dominant Visual Tone | Primary Material Focus | Accent Use | Visual Risk |
| ---------------- | --------------------------- | ----------------------------- | --------------------------------- | ---------------------------------- |
| 01 Opening | dark + premium impact | seal metal / dark glass | rare warm highlight + cyan ripple | cartoon stamp or over-impact |
| 02 Hero | clear readable display | active screen glow | cyan CTA/data hints | identity hidden by effects |
| 03 Architecture | structured system interface | system nodes / data lines | cyan route pulses | unreadable node complexity |
| 04 Projects | working-machine focus | laptop metal / overlay panels | project status highlights | decorative cards without proof |
| 05 Product UX | clean flow/interface | tablet glass / UI shells | subtle path lines | designer-only look |
| 06 Responsive | minimal mobile clarity | mobile frame / layout morph   | restrained indicators | heavy scene claiming performance |
| 07 System Core | deep backend environment | DB core / service nodes | directional API pulses | generic sci-fi reactor |
| 08 Final Contact | calm connected finale | all devices balanced | one clear CTA accent | visual ending with weak conversion |

---

# 10. Forbidden Visual Treatments

The following are forbidden unless explicitly approved later:

* Cyberpunk neon overload
* Purple-dominant glow
* Rainbow gradients
* Toy-like plastic devices
* Cartoon stamp
* Excessive bloom
* Excessive particles
* Random floating UI panels
* Fake dashboards
* Meaningless glowing cubes
* Dense unreadable code rain
* Chrome mirror materials
* Low-contrast grey text
* Tiny mobile text
* Game HUD styling
* Spaceship/city/room concept drift
* Decorative effects that do not support the story

---

# 11. Future Implementation Notes

* These tokens are documentation-only in Phase 0.
* Runtime material presets should not be created until the implementation phase that needs them.
* When implementation begins, material/code files must follow this document instead of inventing new colors or effects.
* Any deviation from this token document must be documented as a conscious design decision, not an accidental implementation choice.
* Later implementation should convert this document into shared constants only after Phase 1 tooling and structure are ready.

---

# 12. Task 0.4 QA Checklist

- [x] `docs/portfolio-3d/visual-material-tokens.md` exists
- [x] The approved concept is preserved
- [x] Color token table exists
- [x] Hex values are documented
- [x] Material preset table exists
- [x] Screen/portal surface rules are documented
- [x] Lighting rules are documented
- [x] Typography color rules are documented
- [x] Background system element rules are documented
- [x] Scene-level visual application table exists
- [x] Forbidden visual treatments are documented
- [x] Future implementation notes are included
- [x] `experience-blueprint.md` was only updated with a short reference, if updated
- [x] No implementation code was added
- [x] No material runtime file was created
- [x] No shader file was created
- [x] No assets were created
- [x] No packages were installed
- [x] Task 0.5 was not started
