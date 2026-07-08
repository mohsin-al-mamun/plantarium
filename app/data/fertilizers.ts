export type Layer = "surface" | "mid" | "bedrock"

export type Fertilizer = {
  name: string
  local: string
  symbol: string
  purpose: string
  how: string
  bestTime: string
  method: string
  dose: string
  per: string
  freq: string
  results?: string
  mistake?: string
  notUse?: string
  overuse?: string
  sources?: string
  why?: string
  notes?: [string, string][]
  caution?: string
}

export const surfaceData: Fertilizer[] = [
  {
    name: "Urea", local: "ইউরিয়া", symbol: "N 46%",
    purpose: "Feeds leafy growth and deepens foliage colour by supplying nitrogen, the core building block of chlorophyll.",
    how: "Nitrogen is highly mobile within the plant, moving from older leaves to new growth first — which is why deficiency always shows up on the oldest leaves first.",
    bestTime: "Early morning, during active growth", method: "Soil Drench",
    dose: "1 tsp (~5 g)", per: "1 L water", freq: "Every 15–20 days, roots moist beforehand",
    results: "Greener new leaf growth is usually visible within 7–10 days.",
    mistake: "Adding extra fertilizer to force faster growth — nitrogen builds leaves, it doesn't speed up the plant's natural pace.",
    notUse: "Plants already dark green, growing vigorously, or flowering heavily.",
    overuse: "Excess leafy growth, weak stems, delayed flowering, and soft new growth that attracts aphids.",
    why: "Nitrogen drives the plant's basic growth engine — without it, leaves stay small and pale regardless of any other nutrient.",
    notes: [["Deficiency", "Older leaves yellow first, growth stalls"]],
    caution: "Never apply to dry soil or in peak afternoon sun — can scorch roots.",
  },
  {
    name: "TSP", local: "ট্রিপল সুপার ফসফেট", symbol: "P 46%",
    purpose: "Supplies phosphorus to drive root development and flower or fruit formation.",
    how: "Phosphorus barely moves through soil or irrigation water, so it needs to already be sitting close to the roots to do any good.",
    bestTime: "At potting or repotting, before root growth begins", method: "Soil Mixed",
    dose: "1 tsp per pot", per: "soil-mixed, not liquid", freq: "At potting, then every 2–3 months",
    results: "Stronger rooting within 3–4 weeks; flowering effects take longer to show.",
    mistake: "Expecting quick results from a surface application or through irrigation alone.",
    notUse: "A situation needing an immediate nutrient response — phosphorus acts slowly by nature.",
    overuse: "Rare in containers, but heavy repeated use can block uptake of iron and zinc.",
    why: "Roots and flowers can't form properly without phosphorus, no matter how much nitrogen or potassium is available.",
    notes: [["Deficiency", "Purplish leaf undersides, poor rooting, delayed flowering"]],
  },
  {
    name: "MOP", local: "মিউরেট অব পটাশ", symbol: "K 60%",
    purpose: "Supplies potassium to build disease resistance, fruit colour, taste, and drought tolerance.",
    how: "It's a chloride salt of potassium, so chloride-sensitive plants may do better on Sulfate of Potash (SOP) where it's available.",
    bestTime: "During active growth, especially as fruiting approaches", method: "Soil Drench",
    dose: "½ tsp (~2.5 g)", per: "1 L water", freq: "Every 15 days, especially through fruiting",
    results: "Fruit firmness and colour improve over the following harvest cycle.",
    mistake: "Skipping potassium once flowering starts — it matters more, not less, from this point on.",
    notUse: "Repeated heavy use on chloride-sensitive plants — switch to SOP for those if possible.",
    overuse: "Leaf-edge scorch, salt buildup in the potting mix, and reduced calcium or magnesium uptake — heavy potassium can crowd calcium out at the root zone and trigger blossom-end rot even when calcium in the soil is fine.",
    why: "Potassium strengthens cell walls and regulates water movement — that's what gives well-fed plants better fruit quality and stronger disease resistance.",
    notes: [
      ["Antagonism risk", "Potassium and calcium share the same uptake channels at the root, so pushing MOP hard during fruiting can starve the plant of calcium regardless of how much Gypsum is in the pot"],
      ["Pairs with", "TSP during the flower-to-fruit transition"],
    ],
  },
  {
    name: "NPK Complex", local: "এনপিকে সার (১৯-১৯-১৯)", symbol: "N-P-K balanced",
    purpose: "An equal-ratio blend of nitrogen, phosphorus, and potassium for general nutrition.",
    how: "Best used for overall nutrition rather than a fix for one specific deficiency — no single symptom points to N, P, or K alone.",
    bestTime: "During active growth, as a general feed", method: "Foliar Spray or Soil Drench",
    dose: "1 g", per: "1 L water", freq: "Every 15 days when overall growth looks weak but no specific deficiency is visible",
    results: "General vigour improves gradually over 2–3 feeding cycles.",
    mistake: "Using it as a substitute for diagnosing an actual deficiency.",
    notUse: "A clear single-nutrient deficiency is visible — treat that specifically instead.",
    overuse: "Salt buildup, leaf-tip burn, and excess soft growth from general over-fertilization.",
    why: "A balanced feed keeps growth steady when nothing specific is wrong but overall vigour needs a lift.",
  },
]

export const midData: Fertilizer[] = [
  {
    name: "Epsom Salt", local: "এপসম সল্ট", symbol: "Mg + S",
    purpose: "Supplies magnesium and sulfur to correct pale, washed-out older leaves caused by true magnesium deficiency.",
    how: "Magnesium sits at the centre of every chlorophyll molecule, so even a mild shortage shows up directly in leaf colour.",
    bestTime: "Early morning or late afternoon, avoid midday heat", method: "Foliar Spray or Soil Drench",
    dose: "1 tsp (~5 g)", per: "1 L water", freq: "Once a month — only when magnesium deficiency is suspected or confirmed",
    results: "Leaf colour typically improves within 1–2 weeks of a confirmed deficiency.",
    mistake: "Treating every yellow leaf as a magnesium problem — check for the vein-green pattern first.",
    notUse: "Routine use on any yellowing leaf without the vein-green pattern — check for other causes first.",
    overuse: "Rare, but frequent unnecessary use can disrupt calcium and potassium balance in the soil.",
    sources: "Dolomite also supplies magnesium, alongside calcium.",
    why: "Without magnesium, the plant can't complete chlorophyll production even if nitrogen levels are fine.",
    notes: [["Deficiency", "Veins stay green while the rest of the leaf yellows"], ["Good for", "Chili, tomato, and any pot showing this specific vein-yellowing pattern"]],
  },
  {
    name: "Gypsum", local: "জিপসাম", symbol: "Ca + S",
    purpose: "Supplies calcium and sulfur without changing soil pH, supporting cell wall strength.",
    how: "Where blossom-end rot comes from a genuine calcium shortfall, gypsum can help — though the same symptom is just as often caused by uneven watering.",
    bestTime: "At potting or during early fruit development", method: "Soil Mixed",
    dose: "1 tsp per pot", per: "soil-mixed, not liquid", freq: "Every 2–3 months",
    results: "Reduced blossom-end rot on new fruit within 3–4 weeks, if calcium was the true cause.",
    mistake: "Applying gypsum for blossom-end rot without checking watering consistency first.",
    notUse: "Blossom-end rot caused purely by irregular watering — fix the watering first.",
    overuse: "Uncommon; excess sulfur over long periods can slightly acidify the mix.",
    sources: "Dolomite also supplies calcium, plus magnesium, in one application.",
    why: "Calcium holds cell walls together — without it, fast-growing tissue like fruit tips breaks down first.",
    notes: [["Also check", "Watering consistency — uneven watering causes the same symptom even with enough calcium in the soil"]],
  },
  {
    name: "Dolomite / Lime", local: "ডলোমাইট চুন", symbol: "Ca + Mg",
    purpose: "Corrects acidic potting mix and supplies calcium and magnesium together.",
    how: "One application addresses both the pH imbalance and the nutrient gap at once.",
    bestTime: "At potting, or at the start of a growing season", method: "Soil Mixed",
    dose: "1–2 tsp per pot", per: "soil-mixed, not liquid", freq: "At potting, then every 3–4 months",
    results: "Soil pH shifts gradually over 3–6 weeks; nutrient effects follow after.",
    mistake: "Applying it without checking whether the mix is actually acidic.",
    notUse: "The growing medium is already neutral or alkaline.",
    overuse: "Soil pH pushed too high (alkaline), which can lock up iron and other micronutrients.",
    sources: "Gypsum is a calcium-only alternative when the mix doesn't need magnesium or a pH correction.",
    why: "Most container plants stall in acidic mix regardless of how much fertilizer is added — correcting pH lets nutrients work at all.",
    notes: [
      ["pH note", "Calcium-rich amendments like this can also shift how available certain micronutrients are — space it a week or two apart from micronutrient feeds"],
      ["If also feeding Iron Chelate", "Lime pushes soil pH up, which can deactivate a soil-drenched Fe-EDTA — switch that to a foliar spray for a few weeks after liming"],
    ],
  },
]

export const bedrockData: Fertilizer[] = [
  {
    name: "Borax / Boric Acid", local: "বোরন", symbol: "B — trace",
    purpose: "Supplies boron, essential for flower set and fruit formation, preventing flower drop and fruit cracking.",
    how: "Boron is needed in literal parts per million, and in a small container it's very easy to overshoot that — it's difficult to correct once over-applied, so avoid repeated applications.",
    bestTime: "At first flowering only", method: "Soil Drench",
    dose: "A tiny pinch (~0.25 g)", per: "1 L water", freq: "Once, at first flowering only — use with extreme caution",
    results: "Improved fruit set is usually visible over the following 2–3 weeks.",
    mistake: "Repeating the dose every month 'just to be safe' — this is the fastest way to cause severe toxicity.",
    notUse: "Any repeat application unless a deficiency has been clearly confirmed again — never dose 'just in case.'",
    overuse: "Leaf-tip and edge burn, leaf drop, stunted roots, and in severe cases plant death — symptoms that closely resemble deficiency, which makes it easy to misread and make things worse.",
    why: "Boron is essential in tiny amounts for pollen viability and fruit set, but the safe range is extremely narrow — narrower than any other fertilizer on this page.",
    notes: [["Deficiency", "Flowers drop before setting fruit, fruit cracks or deforms"]],
    caution: "Toxicity occurs easily and the symptoms look similar to deficiency. Never repeat within the same season unless the deficiency is confirmed again — in a small container, even a small excess can be lethal.",
  },
  {
    name: "Zinc Sulfate", local: "জিংক সালফেট", symbol: "Zn — trace",
    purpose: "Supplies zinc to support enzyme activity and normal leaf expansion.",
    how: "Genuine zinc deficiency is relatively uncommon in container gardens, so confirm the symptom pattern before reaching for this one.",
    bestTime: "During active growth, if symptoms are confirmed", method: "Foliar Spray",
    dose: "1 tsp (~5 g)", per: "2 L water", freq: "Once every 6–8 weeks if symptoms appear",
    results: "New leaves return to normal size within 2–3 weeks.",
    mistake: "Reaching for zinc before ruling out more common deficiencies like nitrogen or iron.",
    notUse: "New leaves look otherwise normal — don't dose without the specific symptom.",
    overuse: "Can interfere with iron uptake if used too often.",
    why: "Zinc supports the enzymes that control normal leaf expansion — without it, new growth comes in stunted.",
    notes: [["Deficiency", "New leaves emerge small, narrow, or crinkled"]],
  },
  {
    name: "Iron Chelate (Fe-EDTA)", local: "আয়রন চিলেট", symbol: "Fe — trace",
    purpose: "Supplies iron in a form plants can absorb easily, needed to build chlorophyll in new growth.",
    how: "Iron deficiency in pots is very often caused by an alkaline growing medium locking the iron up, rather than a true lack of iron in the soil.",
    bestTime: "Early morning, during active growth", method: "Foliar Spray or Soil Drench — foliar preferred if the mix is alkaline or recently limed",
    dose: "1 g", per: "2 L water", freq: "Every 3–4 weeks if new leaves stay pale",
    results: "New leaves typically green up within 1–2 weeks.",
    mistake: "Repeating doses without checking whether the growing medium has become alkaline.",
    notUse: "Older leaves are the ones showing yellowing — that points to nitrogen or magnesium instead.",
    overuse: "Rare; excess can occasionally stain leaves or soil slightly.",
    sources: "Compost and worm castings supply a little iron naturally, though rarely enough on their own to correct a real deficiency.",
    why: "Without enough iron, new leaves can't produce enough chlorophyll and stay pale no matter how healthy the rest of the plant looks.",
    notes: [
      ["Deficiency", "New leaves yellow with veins still green — unlike magnesium, which affects older leaves"],
      ["pH note", "Iron becomes less available to roots as the growing medium turns alkaline, and the EDTA chelate itself starts to break down above roughly pH 6.5 — this is the most common real cause of iron deficiency in pots"],
      ["If you've added Dolomite", "Lime raises soil pH, which can deactivate a soil-drenched Fe-EDTA — use a foliar spray instead until the pH settles"],
    ],
  },
  {
    name: "Manganese Sulfate", local: "ম্যাঙ্গানিজ সালফেট", symbol: "Mn — trace",
    purpose: "Supplies manganese to support photosynthesis.",
    how: "Less common as a true deficiency, but tends to show up in pots that stay waterlogged.",
    bestTime: "During active growth, if symptoms are confirmed", method: "Foliar Spray",
    dose: "1 g", per: "2 L water", freq: "Only if symptoms appear",
    results: "Leaf mottling fades within 2–3 weeks of correcting both drainage and manganese.",
    mistake: "Treating waterlogged-pot symptoms with manganese alone without fixing drainage.",
    notUse: "Soil already drains poorly and stays wet — fix drainage before adding more inputs.",
    overuse: "Can compound with poor drainage to stress roots further.",
    why: "Manganese supports the enzyme systems behind photosynthesis, though true shortages are rare compared to drainage-related symptoms.",
    notes: [["Deficiency", "Blotchy yellowing between veins, mainly in overwatered pots"]],
  },
  {
    name: "Humic Acid", local: "হিউমিক এসিড", symbol: "soil conditioner",
    purpose: "Improves nutrient availability, root development, and potting mix structure rather than supplying nutrients directly.",
    how: "It doesn't feed the plant itself — it helps the plant use whatever else is applied more efficiently.",
    bestTime: "Any time, ideally alongside a regular watering", method: "Soil Drench",
    dose: "1–2 ml (or g)", per: "1 L water", freq: "Every 15 days, safe as a routine tonic",
    results: "Soil structure and root vigour improve gradually over several weeks.",
    mistake: "Expecting it to correct a nutrient deficiency on its own.",
    notUse: "As a replacement for an actual nutrient application when a deficiency is confirmed.",
    overuse: "Minimal risk at recommended doses — one of the safest routine additions here.",
    why: "Better soil structure and root development mean every other fertilizer applied works more effectively.",
    notes: [["Best for", "Root establishment in new transplants and tired old potting mix"]],
  },
  {
    name: "Fulvic Acid", local: "ফুলভিক এসিড", symbol: "soil conditioner",
    purpose: "A smaller-molecule relative of humic acid, absorbed faster by leaves and roots.",
    how: "Its smaller molecular size makes it work especially well as a foliar spray.",
    bestTime: "Early morning or late afternoon", method: "Foliar Spray",
    dose: "1 ml", per: "1 L water", freq: "Every 2 weeks",
    results: "Often visible within days — faster than humic acid.",
    mistake: "Using it interchangeably with humic acid without noting the faster, lighter effect.",
    overuse: "Minimal risk at recommended doses.",
    why: "Its smaller molecules move into leaf tissue quickly, useful when a fast lift is needed.",
  },
  {
    name: "Seaweed Extract", local: "সিউইড এক্সট্র্যাক্ট", symbol: "biostimulant",
    purpose: "Contains natural plant hormones and trace compounds that build resilience to heat stress and transplant shock.",
    how: "It's a biostimulant, not a fertilizer — it supports the plant's own responses rather than supplying nutrients.",
    bestTime: "Early morning or late afternoon, during active growth", method: "Foliar Spray",
    dose: "2–3 ml", per: "1 L water", freq: "Every 2–3 weeks",
    results: "Improved stress tolerance becomes visible after the next heat event or transplant.",
    mistake: "Relying on it in place of actual fertilizer when nutrients are genuinely lacking.",
    notUse: "As a substitute for nitrogen, phosphorus, or potassium feeding.",
    overuse: "Minimal risk at recommended doses.",
    why: "The natural hormones support the plant's own stress response, which fertilizer alone doesn't provide.",
  },
  {
    name: "Vermicompost", local: "ভার্মিকম্পোস্ট", symbol: "organic base",
    purpose: "The steady, slow-release foundation of a healthy pot — improves texture, microbial life, and water retention.",
    how: "Breaks down gradually, feeding the soil rather than the plant directly.",
    bestTime: "Any time, ideally monthly", method: "Top Dressing",
    dose: "100–200 g per pot", per: "soil-mixed, not liquid", freq: "Top-dress monthly",
    results: "Soil improvement occurs gradually, visible over 1–2 months.",
    mistake: "Assuming compost alone can replace targeted feeding during heavy flowering or fruiting.",
    overuse: "Very low risk — mild enough to use regularly without overfeeding.",
    sources: "The primary organic-matter source for this garden — everything else here works alongside it, not instead of it.",
    why: "Healthy soil structure and microbial life are what make every other fertilizer effective in the first place.",
  },
  {
    name: "Vermiwash", local: "ভার্মিওয়াশ", symbol: "liquid organic",
    purpose: "Liquid runoff from a worm bin — a mild, complete tonic safe for frequent use.",
    how: "Delivers a broad, low-concentration mix of nutrients and beneficial microbes.",
    bestTime: "Early morning or late afternoon", method: "Soil Drench",
    dose: "100 ml", per: "1 L water (1:10)", freq: "Every 10–15 days, drench",
    results: "General plant vigour improves gradually over several weeks.",
    mistake: "Using it at full strength instead of diluted.",
    overuse: "Very low risk at the recommended dilution.",
    why: "Its mild, broad nutrient profile makes it a safe routine supplement rather than a targeted fix.",
  },
  {
    name: "Mustard Oil Cake", local: "সরিষার খৈল", symbol: "slow N",
    purpose: "A traditional organic nitrogen source, best used as a fermented liquid tea rather than mixed dry into an active pot.",
    how: "Fresh, dry cake decomposes fast in warm, moist potting mix, generating localized heat and a surface mold that can burn roots and trigger anaerobic rot. Fermenting it in water first pre-breaks the material down into a mild, diluted liquid the roots can handle safely.",
    bestTime: "During active vegetative growth", method: "Soil Drench (fermented liquid)",
    dose: "100 ml fermented liquid", per: "1 L water (1:10 dilution)", freq: "Every 3–4 weeks during vegetative growth",
    results: "Nitrogen release is gradual, visible in leaf colour over 2–3 weeks.",
    mistake: "Mixing dry, unfermented cake directly into the pot instead of brewing and diluting it first.",
    notUse: "Placing fresh, dry powder directly against the plant stem — as it breaks down it generates intense heat and will burn the roots.",
    overuse: "Root rot, surface mold, and heat damage to roots if applied dry, too concentrated, or too close to the stem.",
    why: "As a fermented, diluted organic source, it feeds the soil gently over weeks instead of risking a raw, high-heat decomposition spike right at the roots.",
    notes: [["Preparation", "Soak the solid cake in water for 4–5 days, discard the heavy sludge, dilute the liquid until it looks like weak tea, and apply as a soil drench away from the main stem"]],
    caution: "Keep the fermented liquid away from direct contact with stems and roots. Fermentation has a strong smell — brew it somewhere away from living spaces on the rooftop.",
  },
]

export const glossary: { term: string; def: string }[] = [
  { term: "Soil Drench", def: "Pouring diluted fertilizer directly onto the soil so it reaches the roots." },
  { term: "Foliar Spray", def: "Misting diluted fertilizer onto the leaves, which absorb it directly and quickly." },
  { term: "Top Dressing", def: "Scattering solid fertilizer or compost on the soil surface without digging it in." },
  { term: "Soil Mixed", def: "Working a solid fertilizer into the potting mix itself, usually at potting or repotting." },
  { term: "Side Dressing", def: "Placing solid fertilizer in a shallow ring around the plant, a little away from the stem." },
]

export const diagData: { symptom: string; cause: string; fix: string }[] = [
  { symptom: "Older leaves pale, whole leaf yellow", cause: "Nitrogen deficiency", fix: "Urea drench, 1 tsp/L, every 2 weeks" },
  { symptom: "Veins green, rest of leaf yellow (older leaves)", cause: "Magnesium deficiency", fix: "Epsom salt, 1 tsp/L, monthly" },
  { symptom: "New leaves yellow, veins still green", cause: "Iron deficiency", fix: "Iron chelate, 1 g/2L, every 3–4 weeks" },
  { symptom: "New leaves small and crinkled", cause: "Zinc deficiency", fix: "Zinc sulfate, 1 tsp/2L" },
  { symptom: "Flowers drop before fruiting", cause: "Boron deficiency", fix: "Borax, a tiny pinch (~0.25 g)/L, once only" },
  { symptom: "Dark patch on fruit's blossom end", cause: "Calcium deficiency, often triggered by dry-out stress", fix: "Fix watering consistency first — calcium only moves through steady transpiration; if it persists, mix Gypsum into soil" },
  { symptom: "Leaf edges scorched brown", cause: "Potassium deficiency", fix: "MOP, ½ tsp/L, every 15 days" },
  { symptom: "Purple tinge on leaf undersides", cause: "Phosphorus deficiency", fix: "TSP mixed into soil at next repotting" },
]

export const chiliStages: { stage: string; what: string }[] = [
  { stage: "At transplanting", what: "Vermicompost + TSP worked into the potting mix. No liquid feed for the first week — let roots settle." },
  { stage: "Weeks 3–6, vegetative", what: "Urea drench, 1 tsp/L, every 15–20 days. Keep nitrogen moderate — too much delays flowering." },
  { stage: "First flowers appear", what: "Gradually reduce nitrogen and increase potassium as flowering begins — MOP (½ tsp/L) and Epsom salt (1 tsp/L monthly). One-time borax dose, a tiny pinch (~0.25 g)/L, to prevent flower drop." },
  { stage: "Fruit set onward", what: "Continue potassium. Watch fruit undersides for calcium spotting — gypsum into soil if it appears." },
]

export const scheduleData: { week: string; focus: string; action: string }[] = [
  { week: "Newly Transplanted", focus: "Settle in", action: "No liquid feed for the first week. Vermicompost worked into the mix at potting is enough while roots establish. If feeding is needed, use half-strength doses only." },
  { week: "Vegetative Growth", focus: "Build the plant", action: "Urea drench (1 tsp/L) every 15–20 days, alongside humic acid (1–2 ml/L) every 15 days. Check new leaves for iron or zinc symptoms before dosing either." },
  { week: "Flowering", focus: "Shift the balance", action: "Ease off nitrogen. Bring in MOP (½ tsp/L) and Epsom salt (1 tsp/L monthly). A one-time borax dose (a tiny pinch, ~0.25 g/L) here helps flowers set instead of dropping." },
  { week: "Fruiting", focus: "Sustain potassium", action: "Continue MOP through fruit development. Watch fruit undersides for calcium spotting — gypsum into the soil if it appears, alongside consistent watering." },
  { week: "Recovery After Harvest", focus: "Rebuild reserves", action: "Light vermicompost top-dress and a humic acid drench to recondition the soil before the next cycle. Hold off on strong feeds until new growth resumes." },
]

export const beforeChecklist = [
  "Is the plant actively growing, not dormant?",
  "Is the soil already moist, not bone-dry?",
  "Have you checked for pests or disease first?",
  "Have you confirmed the deficiency, not guessed it?",
  "Is the weather suitable — not peak midday heat?",
]

export const afterChecklist = [
  "Observe new growth over the next 1–2 weeks.",
  "Watch for signs of fertilizer burn on leaf edges.",
  "Avoid applying another fertilizer immediately unless necessary.",
  "Water normally — don't let the mix dry out right after feeding.",
]

export const storageTips = [
  "Store fertilizers in a cool, dry place.",
  "Keep containers tightly sealed between uses.",
  "Protect from moisture and direct sunlight.",
  "Keep well away from children and pets.",
]

export const safetyTips = [
  "Wear gloves when handling concentrated chemicals.",
  "Avoid inhaling fertilizer dust while mixing.",
  "Wash hands thoroughly after every application.",
  "Never mix unknown fertilizers together in one container.",
]

export const comingSoon = ["Calcium Nitrate", "Sulfate of Potash (SOP)", "Diammonium Phosphate (DAP)", "Fish Emulsion", "Compost Tea"]

export const quickRefRows: (Fertilizer & { layer: Layer })[] = [
  ...surfaceData.map((d) => ({ ...d, layer: "surface" as const })),
  ...midData.map((d) => ({ ...d, layer: "mid" as const })),
  ...bedrockData.map((d) => ({ ...d, layer: "bedrock" as const })),
]
