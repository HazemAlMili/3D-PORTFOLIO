تمام، كده عندنا **7 phases** للمشهد الأول:

1. **Phase 0 — Creative Lock**
2. **Phase 1 — Asset & Staging Lock**
3. **Phase 2 — Motion Map & Timing System**
4. **Phase 3 — Character Performance Build**
5. **Phase 4 — Identity Reveal Build**
6. **Phase 5 — Portal & Camera Build**
7. **Phase 6 — Integration, QA & Lock**

---

# Scene 01 Character Opening — Phase Task Breakdown

## Phase 0 — Creative Lock

**هدف المرحلة:**
نقفل الرؤية الإبداعية للمشهد الأول قبل التنفيذ، عشان الأجنت ما يشتغلش بتخمين.

### Tasks

**0.1 — Confirm Scene 01 Final Story**

- الشخصية في المنتصف.
- تحية بالإيد.
- الاسم يدخل من اليمين.
- الوظيفة تدخل من الشمال.
- الإيد تعمل O أو hand-adjacent portal حسب قدرة المجسم.
- الكاميرا تدخل من الـ O باتجاه العين.
- الانتقال يفتح بداية باقي الرحلة.

**0.2 — Lock Text Content**

- تحديد الاسم النهائي.
- تحديد الوظيفة النهائية.
- تحديد هل فيه intro line ولا لأ.
- منع hardcoded text في أكتر من مكان.

**0.3 — Decide Name/Role Rendering Mode**

- هل النص هيكون 3D Text داخل canvas؟
- ولا DOM overlay؟
- ولا hybrid؟
- القرار يتاخد بناءً على readability والتزامن مع السكروول.

**0.4 — Define Portal Type**

- Case A: hand O حقيقي لو finger rig موجود.
- Case B: hand-adjacent lens لو اليد موجودة بس الأصابع مش متحكمة.
- Case C: eye/hand cinematic fallback لو الموديل static.

**0.5 — Create Scene 01 Creative Lock Report**

- يكتب القرارات النهائية.
- يوضح المسموح والممنوع.
- يحدد بالضبط شكل المشهد قبل التنفيذ.

### Lock Criteria

- كل beats واضحة.
- النص النهائي معروف.
- طريقة عرض الاسم والوظيفة متحددة.
- نوع الـ portal متحدد.
- مفيش ambiguity قبل التنفيذ.

---

## Phase 1 — Asset & Staging Lock

**هدف المرحلة:**
نتأكد إن المجسم الحقيقي ظاهر ومتمركز ومقاسه صح قبل أي حركة أو أنيميشن.

### Tasks

**1.1 — Verify Avatar GLB Path**

- تحديد مكان ملف GLB الحقيقي.
- التأكد إن runtime URL بيرجع `200`.
- منع fallback/debug shapes من الظهور بدل المجسم.

**1.2 — Render Raw Avatar**

- عرض المجسم مباشرة باستخدام `useGLTF`.
- بدون gestures.
- بدون bone manipulation.
- بدون portal.
- الهدف: إثبات إن المجسم ظاهر فعلاً.

**1.3 — Calculate Avatar Bounds**

- استخراج bounding box.
- تحديد size.
- تحديد center.
- معرفة هل المجسم معمول بالمتر ولا بالسنتيمتر.

**1.4 — Lock Avatar Scale**

- اختيار scale واحد واضح.
- منع حلول عشوائية زي ضرب coordinates في 100 من غير توثيق.
- تثبيت scale في config.

**1.5 — Lock Avatar Position**

- الشخصية تكون في منتصف المشهد.
- الوجه والجسم العلوي واضحين.
- لا تكون تحت الكاميرا أو خارج الفريم.

**1.6 — Lock Initial Camera Framing**

- الكاميرا تشوف الشخصية بوضوح.
- لقطة opening تكون medium / upper-body.
- مفيش clipping في البداية.

**1.7 — Lighting Baseline**

- key light ناعم على الوجه.
- rim light خفيف.
- background dark premium.
- ممنوع الإضاءة تخفي ملامح الشخصية.

**1.8 — Rig Audit**

- هل فيه skeleton؟
- هل فيه animation clips؟
- هل فيه hand bones؟
- هل فيه thumb/index bones؟
- هل العين mesh منفصل؟
- هل الرأس ممكن يتحرك؟

**1.9 — Asset & Staging Report**

- GLB path.
- runtime URL.
- bounds.
- scale.
- position.
- rig status.
- limitations.

### Lock Criteria

- المجسم ظاهر فعلاً.
- الشخصية متمركزة.
- الكاميرا شايفاها.
- الاسم/الحركات لسه مش مطلوبة هنا.
- عارفين هل hand O حقيقي ممكن ولا لأ.

---

## Phase 2 — Motion Map & Timing System

**هدف المرحلة:**
نبني خريطة حركة مبنية على `localProgress`، بحيث كل حاجة تتحرك بالسكروول مش بالوقت.

### Tasks

**2.1 — Create Opening Motion Helper**

- ملف مثل:
  - `openingMotion.ts`

- يحتوي pure functions فقط.

**2.2 — Add Range Utilities**

- `clamp01`
- `normalizeRange`
- `smoothstep01`
- `rangeProgress`

**2.3 — Define Scene 01 Beat Ranges**

```txt
0.00 – 0.10  settle
0.10 – 0.28  greeting
0.22 – 0.45  nameReveal
0.30 – 0.52  roleReveal
0.50 – 0.68  focusPose
0.68 – 0.82  handPortal
0.82 – 0.94  cameraPortal
0.94 – 1.00  exit
```

**2.4 — Implement `getOpeningMotionState(localProgress)`**

- يرجع values لكل beat.
- كل value من 0 إلى 1.
- reversible.

**2.5 — Connect Scene 01 To Local Progress**

- Scene 01 تستخدم `sceneLocalProgress`.
- ممنوع timers.
- ممنوع autoplay animation.

**2.6 — Motion Debug Check**

- dev-only logging أو debug panel بسيط لو محتاج.
- يوضح progress لكل beat.
- يتشال أو يتقفل في الإنتاج.

**2.7 — Motion Spec Report**

- يوضح ranges.
- يوضح كل beat بيبدأ وينتهي فين.
- يثبت إن الحركة scroll-derived.

### Lock Criteria

- كل beat مربوط بـ progress.
- الحركة reversible.
- مفيش time-based animation للـmain sequence.
- جاهزين نبني أداء الشخصية فوقها.

---

## Phase 3 — Character Performance Build

**هدف المرحلة:**
الشخصية تبقى حية ومفهومة: idle، تحية، hand prep، focus pose.

### Tasks

**3.1 — Build `OpeningAvatar` Structure**

- تحميل المجسم.
- apply scale/position من config.
- expose group refs.
- فصل loading/fallback عن الحركة.

**3.2 — Add Subtle Idle Motion**

- breathing بسيط.
- slight body movement.
- حركة خفيفة لا تشتت.

**3.3 — Build Greeting Gesture**

- wave gesture من `0.10 – 0.28`.
- الحركة هادئة ومش cartoonish.
- لو rig مش كامل، نعمل أفضل حركة ممكنة باليد/الذراع.

**3.4 — Build Head/Face Attention**

- الرأس أو الوجه يميل بشكل بسيط.
- يدي إحساس إن الشخصية aware.
- بدون overacting.

**3.5 — Build Focus Transition**

- من `0.50 – 0.68`.
- الشخصية تخرج من wave إلى pose مركزة.
- اليد تبدأ تجهز للـ portal.

**3.6 — Build Hand Raise**

- اليد تتحرك ناحية eye line.
- لازم تكون الحركة readable.
- لو مفيش rig، يبقى fallback lens مرتبط باليد أو مسار اليد.

**3.7 — Implement Rig-Safe Bone Utilities**

- bone lookup بالأسامي.
- fallback aliases.
- dev-only bone logs.
- ممنوع child index brittle access.

**3.8 — Implement Hand-O If Supported**

- لو thumb/index bones موجودة:
  - تحريك thumb.
  - تحريك index.
  - تكوين O.
  - wrist alignment ناحية العين.

**3.9 — Implement Fallback If Not Supported**

- لو مفيش finger bones:
  - hand-adjacent portal.
  - من غير ادعاء إن الأصابع عملت O.
  - الحركة تفضل منطقية بصريًا.

**3.10 — Character Performance QA**

- scroll forward.
- scroll reverse.
- fast scroll.
- no broken pose.
- no weird clipping.

### Lock Criteria

- الشخصية حية.
- التحية واضحة.
- الانتقال من greeting إلى focus واضح.
- اليد/portal prep واضح.
- مفيش pose مكسورة.
- مفيش اعتماد على time-based state.

---

## Phase 4 — Identity Reveal Build

**هدف المرحلة:**
الاسم والوظيفة يظهروا بشكل سينمائي ومتزامن مع الشخصية.

### Tasks

**4.1 — Build `OpeningNameRole` Component**

- component مستقل.
- يستقبل `localProgress` أو `motionState`.
- لا يعتمد على CSS timers.

**4.2 — Name Reveal From Right**

- الاسم يبدأ خارج/يمين التكوين.
- يدخل بهدوء ناحية مكانه النهائي.
- range: `0.22 – 0.45`.

**4.3 — Role Reveal From Left**

- الوظيفة تبدأ من الشمال.
- تدخل بهدوء.
- range: `0.30 – 0.52`.

**4.4 — Typography Styling**

- حجم واضح.
- contrast عالي.
- premium spacing.
- لا يغطي وجه الشخصية.

**4.5 — Text Depth / Layer Decision**

- لو 3D text:
  - يتأكد إنه قدام الكاميرا.
  - مش متخفي وراء المجسم.

- لو DOM:
  - يتأكد إنه داخل overlay sync.
  - pointer events صح.

**4.6 — Text Fade Out**

- الاسم والوظيفة يبدأوا يخرجوا قبل portal.
- range مقترح: `0.75 – 0.95`.
- لا يفضلوا ظاهرين فوق Scene 02.

**4.7 — Name/Role Reverse QA**

- عند reverse scroll:
  - النص يرجع مكانه طبيعي.
  - مفيش flicker.
  - مفيش stale text.

### Lock Criteria

- الاسم ظاهر بوضوح.
- الوظيفة ظاهرة بوضوح.
- الدخول بطيء وسينمائي.
- النص متزامن مع المشهد.
- النص يختفي قبل/أثناء handoff.

---

## Phase 5 — Portal & Camera Build

**هدف المرحلة:**
بناء لحظة الدخول من الـ O إلى عين الشخصية ثم بداية باقي الرحلة.

### Tasks

**5.1 — Define Portal Anchor**

- لو hand O حقيقي:
  - anchor بين thumb/index.

- لو fallback:
  - anchor قريب من اليد ومسارها.

- لا يكون portal عشوائي قدام العين من غير ارتباط باليد.

**5.2 — Build `OpeningPortalEffect`**

- ring/lens بسيط.
- activation من `0.68 – 0.82`.
- glow خفيف.
- بدون neon مبالغ.

**5.3 — Align Portal With Eye Line**

- portal يكون في مسار بصري بين اليد والعين.
- العين تبقى destination.
- transition يبقى motivated.

**5.4 — Camera Approach**

- من `0.82 – 0.94`.
- الكاميرا تقرب من الـ O/lens.
- الحركة بطيئة ومفهومة.

**5.5 — Eye Fly-Through**

- من `0.94 – 1.00`.
- الكاميرا تدخل من portal باتجاه العين.
- Scene 02 يبدأ يظهر من handoff.

**5.6 — Retune Scene 01 Keyframes Only**

- تعديل `cameraKeyframes.ts` للمشهد الأول فقط.
- ممنوع تغيير مشاهد 02–08.
- ممنوع rewrite للـCameraDirector.

**5.7 — Prevent Clipping**

- الكاميرا لا تدخل جوه mesh بدري.
- لا تختفي الشخصية فجأة.
- لا يحصل near-plane clipping مزعج.

**5.8 — Portal Visual QA**

- portal واضح.
- hand/eye relation واضح.
- مش generic random ring.
- reverse scroll يعكس الحركة بشكل نظيف.

### Lock Criteria

- portal beat واضح ومفهوم.
- الكاميرا داخلة من مسار مقصود.
- hand/eye transition منطقي.
- handoff لـScene 02 ناعم.

---

## Phase 6 — Integration, QA & Lock

**هدف المرحلة:**
إقفال المشهد الأول بالكامل كـproduction-ready scene.

### Tasks

**6.1 — Scene 01 Full Forward QA**

- من أول المشهد لحد Scene 02.
- slow scroll.
- fast scroll.
- no blank moments.

**6.2 — Scene 01 Reverse QA**

- من Scene 02 راجع لـScene 01.
- كل beats ترجع صح.
- مفيش one-way state.

**6.3 — Cross-Fade QA**

- Scene 01 يختفي بسلاسة.
- Scene 02 يظهر بسلاسة.
- avatar لا يفضل ظاهر زيادة.
- text لا يفضل عالق.

**6.4 — Overlay Sync QA**

- name/role متزامنين.
- مفيش stale overlays.
- مفيش pointer-events غلط.

**6.5 — Reduced Motion Variant**

- نسخة static:
  - avatar أو visual بسيط.
  - name.
  - role.
  - intro line لو موجود.

- بدون wave/portal/camera rush.

**6.6 — Performance QA**

- FPS مستقر.
- لا particles زيادة.
- لا asset كبير غير مبرر.
- لا memory leaks.

**6.7 — Debug Cleanup**

- إزالة debug shapes.
- إزالة console spam.
- dev-only logs فقط لو ضرورية.
- لا pink/cyan primitives.

**6.8 — Production Preview QA**

```bash
npm run build
npm run preview
```

**6.9 — Final Scene 01 Lock Report**

- files changed.
- final camera values.
- rig status.
- portal type.
- QA result.
- limitations.

### Lock Criteria

- Scene 01 يحقق الهدف الإبداعي.
- no runtime errors.
- no visual blockers.
- no debug artifacts.
- جاهز نبني Scene 02 أو نكمل باقي الرحلة.

---

# Execution Summary

الترتيب العملي النهائي:

1. **Phase 0 — Creative Lock**
2. **Phase 1 — Asset & Staging Lock**
3. **Phase 2 — Motion Map & Timing System**
4. **Phase 3 — Character Performance Build**
5. **Phase 4 — Identity Reveal Build**
6. **Phase 5 — Portal & Camera Build**
7. **Phase 6 — Integration, QA & Lock**

أهم نقطة:
**ماينفعش نبدأ Phase 3 قبل Phase 1 وPhase 2 ما يتقفلوا.**
لأن لو المجسم مش متظبط أو الـprogress map مش واضح، كل الحركة هتتلخبط تاني.
