export type Variety = {
  name: string
  photo: string
  photos?: string[]
  trait: string
  season: string
  note: string
}

export type Plant = {
  id: number
  slug: string
  name: string
  description: string
  meta: string
  category: "Flowers" | "Fruits" | "Vegetables"
  img: string
  varieties: Variety[]
}

export const PLANTS: Plant[] = [
  {
    id: 1,
    slug: "cosmos-bipinnatus",
    name: "Cosmos bipinnatus",
    description: "A cottage-garden favourite that self-seeds year after year. Sown direct into deep containers every March; first blooms arrive by late June.",
    meta: "3 varieties · sown March",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Purity",
        photo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        photos: [
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        ],
        trait: "Pure white, single petals",
        season: "Mid Summer",
        note: "The first to bloom each year. I keep a small bunch in the kitchen window all of June — they last longer than anything else I grow.",
      },
      {
        name: "Sensation Mix",
        photo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        trait: "Pink to crimson blend",
        season: "Late Summer",
        note: "Self-seeded from last year's batch. The pinks came through stronger this time, which I didn't mind at all.",
      },
      {
        name: "Double Click Rose Bon Bon",
        photo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        trait: "Double pink, pompom-like",
        season: "Summer",
        note: "New this season. The double-petalled form surprised me — looks almost too deliberate, like something from a florist. I'm keeping it.",
      },
    ],
  },
  {
    id: 2,
    slug: "san-marzano",
    name: "San Marzano",
    description: "The classic Italian paste tomato, staked against the parapet wall. Rich and low-moisture — makes it to the kitchen mostly as sauce.",
    meta: "2 varieties · staked",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "San Marzano 2",
        photo: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
        trait: "Classic elongated paste",
        season: "Mid Summer",
        note: "Makes the best sauce I've ever had from a rooftop. Two plants feed the whole summer — I freeze the rest in batches.",
      },
      {
        name: "Redorta",
        photo: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
        trait: "Very long, meaty flesh",
        season: "Late Summer",
        note: "Slower to set fruit but each one is enormous. Worth the wait — the flesh is dense enough to slice like bread.",
      },
    ],
  },
  {
    id: 3,
    slug: "lacinato-kale",
    name: "Lacinato kale",
    description: "Dark and dinosaur-bumpy, this one overwinters. Cut outer leaves all the way through the cold months and it keeps producing.",
    meta: "1 variety · cool-loving",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Lacinato",
        photo: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
        trait: "Dark blue-green, crinkled",
        season: "Autumn – Winter",
        note: "The only thing growing in January. I strip the outer leaves every ten days and it just keeps going — reliable in a way nothing else is.",
      },
    ],
  },
  {
    id: 4,
    slug: "cafe-au-lait-dahlia",
    name: "Café au Lait dahlia",
    description: "The most-complimented flower on the roof. Tubers lifted each November, stored in paper bags, replanted come April.",
    meta: "4 varieties · tubered",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Café au Lait",
        photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        photos: [
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
        ],
        trait: "Blush peach, dinner plate",
        season: "Late Summer",
        note: "The one that started the whole dahlia obsession. Someone on the street once stopped to ask what it was. That was enough.",
      },
      {
        name: "Labyrinth",
        photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Muted dusky rose",
        season: "Summer",
        note: "Quieter than Café au Lait but somehow more interesting. The colour shifts depending on the light — warm at noon, nearly grey at dusk.",
      },
      {
        name: "Bloomquist Helen",
        photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Warm cream, large bloom",
        season: "Summer",
        note: "A late find from a small nursery in Brooklyn. Cream with a faint blush at the centre — pairs well with everything else on the roof.",
      },
      {
        name: "Ivanetti",
        photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Dusty mauve, semi-cactus",
        season: "Late Summer",
        note: "The spiky semi-cactus form takes some getting used to. By the end of August it's my favourite — it photographs better than anything.",
      },
    ],
  },
  {
    id: 5,
    slug: "albion-strawberry",
    name: "Albion strawberry",
    description: "Two ever-bearing varieties trailing from terracotta pots. Fruits small, dense, and sweet — mostly eaten standing up.",
    meta: "2 varieties · ever-bearing",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Albion",
        photo: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
        trait: "Large, firm, sweet",
        season: "Summer – Autumn",
        note: "Ever-bearing and reliable. I pick every two days through August — they rarely make it past the roof door.",
      },
      {
        name: "Seascape",
        photo: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
        trait: "Bright red, very sweet",
        season: "Summer",
        note: "Smaller than Albion but the flavour is more concentrated. A neighbour asked me to save her some runners — I did.",
      },
    ],
  },
  {
    id: 6,
    slug: "eden-climbing-rose",
    name: "Eden climbing rose",
    description: "Trained along a trellis facing south-east. Takes three years to settle; now it fills a whole panel with blowsy blooms every June.",
    meta: "2 varieties · trellised",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Pierre de Ronsard",
        photo: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
        photos: [
          "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        ],
        trait: "Cream-pink, cupped",
        season: "Late Spring – Summer",
        note: "The patience finally paid off. Third year and it covered the whole east panel. I cut one bloom for the table every morning in June.",
      },
      {
        name: "Fourth of July",
        photo: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
        trait: "Red-white striped, single",
        season: "Summer",
        note: "More informal than Pierre — single petals, striped like a carnival. Added it for contrast and it earns its space.",
      },
    ],
  },
  {
    id: 7,
    slug: "shishito-pepper",
    name: "Shishito pepper",
    description: "Mild and blistered in a pan with salt — a rooftop staple. Three different shapes grow side by side; one in ten still surprises you with heat.",
    meta: "3 varieties · in pots",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Shishito",
        photo: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Mild green, wrinkled skin",
        season: "Summer",
        note: "The reliable one. Pan-blister with olive oil and flaky salt, eat standing at the counter. That's the whole recipe.",
      },
      {
        name: "Padron",
        photo: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Occasionally hot, blistery",
        season: "Summer",
        note: "Mostly mild but you never know. I serve these to guests without warning — it's a better dinner party than any game.",
      },
      {
        name: "Jimmy Nardello",
        photo: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Sweet red, frying type",
        season: "Late Summer",
        note: "An Italian heirloom that fries to a thin crisp. Completely different from the others — sweet, not savoury. A revelation the first time.",
      },
    ],
  },
  {
    id: 8,
    slug: "brown-turkey-fig",
    name: "Brown Turkey fig",
    description: "Now in its second year and finally fruiting. A slow start but the first ripe fig was worth every patient week of waiting.",
    meta: "1 variety · 2nd year",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Brown Turkey",
        photo: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
        trait: "Brownish-purple, rich flesh",
        season: "Late Summer",
        note: "The first fig came in late August. I ate it warm off the tree, split with a thumbnail. Worth the whole two years of waiting.",
      },
    ],
  },
  {
    id: 9,
    slug: "sweet-pea",
    name: "Sweet pea",
    description: "Five varieties, all climbing up jute twine. Picked every other day to keep them blooming — perfect loose bunches for the kitchen table.",
    meta: "5 varieties · climbing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Matucana",
        photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        photos: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
        ],
        trait: "Bicolor maroon and violet",
        season: "Spring",
        note: "The oldest sweet pea variety still in cultivation. The scent is nothing like the modern types — heavier, almost spiced. I grow it every year.",
      },
      {
        name: "Cupani",
        photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Deep purple, intensely fragrant",
        season: "Spring",
        note: "Named after the Sicilian monk who first recorded it in 1699. Knowing that makes cutting the first bunch feel like a small ceremony.",
      },
      {
        name: "Spencer Mix",
        photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Ruffled pastel mix",
        season: "Spring – Summer",
        note: "The frilly petals look like tissue paper caught mid-ruffle. Mixed colours — I let them come up as they want and arrange them loose.",
      },
      {
        name: "Blue Shift",
        photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Lavender-blue, large flowers",
        season: "Spring",
        note: "The largest flowers of the five. The colour shifts from lilac in the morning to something closer to steel blue by afternoon.",
      },
      {
        name: "White Supreme",
        photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Pure white, long stems",
        season: "Spring",
        note: "The simplest and the one I use most for cutting. Long stems, no fuss. Mixed into any bunch it makes everything look intentional.",
      },
    ],
  },
  {
    id: 10,
    slug: "nasturtium",
    name: "Nasturtium",
    description: "Completely unfussy. Trails over pot edges and self-seeds into every crack. Both flowers and leaves are edible — peppery and bright.",
    meta: "2 varieties · trailing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Empress of India",
        photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson, dark leaves",
        season: "Summer",
        note: "The darkest nasturtium I've grown. The crimson against the near-black foliage is more dramatic than anything I planted intentionally.",
      },
      {
        name: "Alaska Mix",
        photo: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        trait: "Variegated green-white leaves",
        season: "Summer",
        note: "Interesting even when not in flower — the marbled leaves do the work. I scatter them in salads more than I cut them for the table.",
      },
    ],
  },
  {
    id: 11,
    slug: "wisteria",
    name: "Wisteria",
    description: "Third year, and the racemes are finally long and heavy. It smells like every good memory you have from May.",
    meta: "1 variety · 3rd year",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Multijuga",
        photo: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
        trait: "Long lilac racemes, fragrant",
        season: "Spring",
        note: "Two years of nothing, then this. The racemes hung almost a foot long and the whole roof smelled different for three weeks in May.",
      },
    ],
  },
  {
    id: 12,
    slug: "monstera-deliciosa",
    name: "Monstera deliciosa",
    description: "The one indoor plant that migrates to the roof in summer. Happy in bright shade; rewards the move with a new leaf each month.",
    meta: "1 variety · indoor",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Thai Constellation",
        photo: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        trait: "Cream-variegated, large leaves",
        season: "Year-round",
        note: "Lives indoors in winter, moves to the shaded corner of the roof in June. Each new leaf unfurls with a slightly different pattern — I photograph every one.",
      },
    ],
  },
  {
    id: 13,
    slug: "larkspur",
    name: "Larkspur",
    description: "Direct-sown in autumn for early summer colour. Spires of blue and lilac that last for weeks when cut and brought inside.",
    meta: "4 varieties · direct sown",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Giant Imperial Blue",
        photo: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Deep indigo spires",
        season: "Early Summer",
        note: "The tallest thing on the roof in June. The blue is so deep it reads as purple in photographs — in person it's unmistakably indigo.",
      },
      {
        name: "Giant Imperial White",
        photo: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Pure white, tall stalks",
        season: "Early Summer",
        note: "Pairs with the blue variety in every vase arrangement I make. The white cools everything down. I always sow more of this than I think I need.",
      },
      {
        name: "Carmine King",
        photo: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson red",
        season: "Spring – Summer",
        note: "The boldest of the four — crimson spikes that look almost out of place next to the blues. I tried it once for contrast and it stuck.",
      },
      {
        name: "Lilac Spire",
        photo: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Soft mauve, feathery",
        season: "Summer",
        note: "The most delicate of the group — the florets are smaller and the whole spike has a lighter, airier feel. Good for adding softness to a tight arrangement.",
      },
    ],
  },
  {
    id: 14,
    slug: "lemon-tree",
    name: "Lemon tree",
    description: "A Eureka in a terracotta pot, moved indoors in October. Slow fruit set but reliably fragrant — worth every winter of careful babying.",
    meta: "1 variety · container",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Eureka",
        photo: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
        trait: "Bright yellow, acidic",
        season: "Year-round",
        note: "Four lemons last year. Four. I moved it inside the moment it dropped below 10°C and talked to it daily through February. Four lemons.",
      },
    ],
  },
  {
    id: 15,
    slug: "rainbow-chard",
    name: "Rainbow chard",
    description: "Grows fast, cuts back to the root, and regrows in weeks. The coloured stems make even a simple salad look considered.",
    meta: "3 varieties · cut-and-come",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
    varieties: [
      {
        name: "Bright Lights",
        photo: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Yellow, orange, pink stems",
        season: "Summer – Autumn",
        note: "The workhorse. Cut it hard and it's back in ten days. The stems look better raw than cooked — I use them for colour in salads more than anything.",
      },
      {
        name: "Rhubarb Chard",
        photo: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson stems",
        season: "Summer – Autumn",
        note: "The one guests always notice. The crimson bleeds a little into the cooking water — beautiful and slightly alarming the first time.",
      },
      {
        name: "Peppermint",
        photo: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Green-white striped",
        season: "Summer",
        note: "Quieter than the others — the white-and-green stripes are subtle. Slower to bolt in heat, which makes it the one I reach for last and regret least.",
      },
    ],
  },
]
