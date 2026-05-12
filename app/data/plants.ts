export type Variety = {
  name: string
  photo: string
  trait: string
  season: string
}

export type Care = {
  fertilizers: string[]
  insecticides: string[]
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
  care: Care
}

export const PLANTS: Plant[] = [
  {
    id: 1,
    slug: "cosmos-bipinnatus",
    name: "Cosmos bipinnatus",
    description:
      "A cottage-garden favourite that self-seeds year after year. Sown direct into deep containers every March; first blooms arrive by late June.",
    meta: "3 varieties · sown March",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Balanced 10-10-10 (monthly)", "Compost tea (spring)"],
      insecticides: ["Neem oil (aphids)", "None typically needed"],
    },
    varieties: [
      {
        name: "Purity",
        photo:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        trait: "Pure white, single petals",
        season: "Mid Summer",
      },
      {
        name: "Sensation Mix",
        photo:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        trait: "Pink to crimson blend",
        season: "Late Summer",
      },
      {
        name: "Double Click Rose Bon Bon",
        photo:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",
        trait: "Double pink, pompom-like",
        season: "Summer",
      },
    ],
  },
  {
    id: 2,
    slug: "san-marzano",
    name: "San Marzano",
    description:
      "The classic Italian paste tomato, staked against the parapet wall. Rich and low-moisture — makes it to the kitchen mostly as sauce.",
    meta: "2 varieties · staked",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Tomato feed 4-8-8 (bi-weekly)", "Seaweed foliar spray"],
      insecticides: ["Insecticidal soap (aphids)", "Copper spray (blight prevention)"],
    },
    varieties: [
      {
        name: "San Marzano 2",
        photo:
          "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
        trait: "Classic elongated paste",
        season: "Mid Summer",
      },
      {
        name: "Redorta",
        photo:
          "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80",
        trait: "Very long, meaty flesh",
        season: "Late Summer",
      },
    ],
  },
  {
    id: 3,
    slug: "lacinato-kale",
    name: "Lacinato kale",
    description:
      "Dark and dinosaur-bumpy, this one overwinters. Cut outer leaves all the way through the cold months and it keeps producing.",
    meta: "1 variety · cool-loving",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Nitrogen-rich 10-5-5 (monthly)", "Fish emulsion (spring)"],
      insecticides: ["Bt spray (cabbage worms)", "Neem oil (aphids)"],
    },
    varieties: [
      {
        name: "Lacinato",
        photo:
          "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?auto=format&fit=crop&w=900&q=80",
        trait: "Dark blue-green, crinkled",
        season: "Autumn – Winter",
      },
    ],
  },
  {
    id: 4,
    slug: "cafe-au-lait-dahlia",
    name: "Café au Lait dahlia",
    description:
      "The most-complimented flower on the roof. Tubers lifted each November, stored in paper bags, replanted come April.",
    meta: "4 varieties · tubered",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Low-nitrogen 5-10-10 (fortnightly)", "Bone meal at planting"],
      insecticides: ["Slug pellets (spring)", "Insecticidal soap (earwigs)"],
    },
    varieties: [
      {
        name: "Café au Lait",
        photo:
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Blush peach, dinner plate",
        season: "Late Summer",
      },
      {
        name: "Labyrinth",
        photo:
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Muted dusky rose",
        season: "Summer",
      },
      {
        name: "Bloomquist Helen",
        photo:
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Warm cream, large bloom",
        season: "Summer",
      },
      {
        name: "Ivanetti",
        photo:
          "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80",
        trait: "Dusty mauve, semi-cactus",
        season: "Late Summer",
      },
    ],
  },
  {
    id: 5,
    slug: "albion-strawberry",
    name: "Albion strawberry",
    description:
      "Two ever-bearing varieties trailing from terracotta pots. Fruits small, dense, and sweet — mostly eaten standing up.",
    meta: "2 varieties · ever-bearing",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Strawberry feed 8-12-32 (weekly in fruit)", "Sulphate of potash (spring)"],
      insecticides: ["Copper tape slug barrier", "None — birds are the bigger threat"],
    },
    varieties: [
      {
        name: "Albion",
        photo:
          "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
        trait: "Large, firm, sweet",
        season: "Summer – Autumn",
      },
      {
        name: "Seascape",
        photo:
          "https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&w=900&q=80",
        trait: "Bright red, very sweet",
        season: "Summer",
      },
    ],
  },
  {
    id: 6,
    slug: "eden-climbing-rose",
    name: "Eden climbing rose",
    description:
      "Trained along a trellis facing south-east. Takes three years to settle; now it fills a whole panel with blowsy blooms every June.",
    meta: "2 varieties · trellised",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Rose granules 4-8-12 (spring & summer)", "Foliar feed (mid-season)"],
      insecticides: ["Fungicide spray (black spot)", "Insecticidal soap (aphids)"],
    },
    varieties: [
      {
        name: "Pierre de Ronsard",
        photo:
          "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
        trait: "Cream-pink, cupped",
        season: "Late Spring – Summer",
      },
      {
        name: "Fourth of July",
        photo:
          "https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80",
        trait: "Red-white striped, single",
        season: "Summer",
      },
    ],
  },
  {
    id: 7,
    slug: "shishito-pepper",
    name: "Shishito pepper",
    description:
      "Mild and blistered in a pan with salt — a rooftop staple. Three different shapes grow side by side; one in ten still surprises you with heat.",
    meta: "3 varieties · in pots",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Pepper feed 5-8-8 (bi-weekly)", "Liquid seaweed foliar spray"],
      insecticides: ["Neem oil (aphids)", "Yellow sticky traps (whitefly)"],
    },
    varieties: [
      {
        name: "Shishito",
        photo:
          "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Mild green, wrinkled skin",
        season: "Summer",
      },
      {
        name: "Padron",
        photo:
          "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Occasionally hot, blistery",
        season: "Summer",
      },
      {
        name: "Jimmy Nardello",
        photo:
          "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?auto=format&fit=crop&w=900&q=80",
        trait: "Sweet red, frying type",
        season: "Late Summer",
      },
    ],
  },
  {
    id: 8,
    slug: "brown-turkey-fig",
    name: "Brown Turkey fig",
    description:
      "Now in its second year and finally fruiting. A slow start but the first ripe fig was worth every patient week of waiting.",
    meta: "1 variety · 2nd year",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["General purpose 10-10-10 (spring only)", "Compost mulch annually"],
      insecticides: ["None required", "Horticultural fleece (frost protection)"],
    },
    varieties: [
      {
        name: "Brown Turkey",
        photo:
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80",
        trait: "Brownish-purple, rich flesh",
        season: "Late Summer",
      },
    ],
  },
  {
    id: 9,
    slug: "sweet-pea",
    name: "Sweet pea",
    description:
      "Five varieties, all climbing up jute twine. Picked every other day to keep them blooming — perfect loose bunches for the kitchen table.",
    meta: "5 varieties · climbing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Low-nitrogen 5-10-10 (fortnightly)", "Potassium-rich feed (flowering)"],
      insecticides: ["Neem oil (thrips)", "Insecticidal soap (young growth aphids)"],
    },
    varieties: [
      {
        name: "Matucana",
        photo:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Bicolor maroon and violet",
        season: "Spring",
      },
      {
        name: "Cupani",
        photo:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Deep purple, intensely fragrant",
        season: "Spring",
      },
      {
        name: "Spencer Mix",
        photo:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Ruffled pastel mix",
        season: "Spring – Summer",
      },
      {
        name: "Blue Shift",
        photo:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Lavender-blue, large flowers",
        season: "Spring",
      },
      {
        name: "White Supreme",
        photo:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
        trait: "Pure white, long stems",
        season: "Spring",
      },
    ],
  },
  {
    id: 10,
    slug: "nasturtium",
    name: "Nasturtium",
    description:
      "Completely unfussy. Trails over pot edges and self-seeds into every crack. Both flowers and leaves are edible — peppery and bright.",
    meta: "2 varieties · trailing",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["None — poor soil preferred", "Occasional diluted compost water"],
      insecticides: ["None needed", "Aphids present — acts as trap crop for other plants"],
    },
    varieties: [
      {
        name: "Empress of India",
        photo:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson, dark leaves",
        season: "Summer",
      },
      {
        name: "Alaska Mix",
        photo:
          "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
        trait: "Variegated green-white leaves",
        season: "Summer",
      },
    ],
  },
  {
    id: 11,
    slug: "wisteria",
    name: "Wisteria",
    description:
      "Third year, and the racemes are finally long and heavy. It smells like every good memory you have from May.",
    meta: "1 variety · 3rd year",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Low-nitrogen 0-10-10 (spring)", "Phosphorus boost at budding"],
      insecticides: ["None typically needed", "Scale insecticide if spotted"],
    },
    varieties: [
      {
        name: "Multijuga",
        photo:
          "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
        trait: "Long lilac racemes, fragrant",
        season: "Spring",
      },
    ],
  },
  {
    id: 12,
    slug: "monstera-deliciosa",
    name: "Monstera deliciosa",
    description:
      "The one indoor plant that migrates to the roof in summer. Happy in bright shade; rewards the move with a new leaf each month.",
    meta: "1 variety · indoor",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Balanced liquid 20-20-20 (monthly)", "Diluted fish emulsion (growing season)"],
      insecticides: ["Neem oil (spider mites)", "Isopropyl wipe (mealybugs)"],
    },
    varieties: [
      {
        name: "Thai Constellation",
        photo:
          "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
        trait: "Cream-variegated, large leaves",
        season: "Year-round",
      },
    ],
  },
  {
    id: 13,
    slug: "larkspur",
    name: "Larkspur",
    description:
      "Direct-sown in autumn for early summer colour. Spires of blue and lilac that last for weeks when cut and brought inside.",
    meta: "4 varieties · direct sown",
    category: "Flowers",
    img: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Balanced 10-10-10 (once at germination)", "None after establishment"],
      insecticides: ["Slug pellets (seedlings)", "None at maturity"],
    },
    varieties: [
      {
        name: "Giant Imperial Blue",
        photo:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Deep indigo spires",
        season: "Early Summer",
      },
      {
        name: "Giant Imperial White",
        photo:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Pure white, tall stalks",
        season: "Early Summer",
      },
      {
        name: "Carmine King",
        photo:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson red",
        season: "Spring – Summer",
      },
      {
        name: "Lilac Spire",
        photo:
          "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80",
        trait: "Soft mauve, feathery",
        season: "Summer",
      },
    ],
  },
  {
    id: 14,
    slug: "lemon-tree",
    name: "Lemon tree",
    description:
      "A Eureka in a terracotta pot, moved indoors in October. Slow fruit set but reliably fragrant — worth every winter of careful babying.",
    meta: "1 variety · container",
    category: "Fruits",
    img: "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Citrus feed 6-3-6 (monthly spring–autumn)", "Iron chelate (for yellowing)"],
      insecticides: ["Horticultural oil (scale)", "Neem oil (spider mites)"],
    },
    varieties: [
      {
        name: "Eureka",
        photo:
          "https://images.unsplash.com/photo-1444930694458-01babf71870c?auto=format&fit=crop&w=900&q=80",
        trait: "Bright yellow, acidic",
        season: "Year-round",
      },
    ],
  },
  {
    id: 15,
    slug: "rainbow-chard",
    name: "Rainbow chard",
    description:
      "Grows fast, cuts back to the root, and regrows in weeks. The coloured stems make even a simple salad look considered.",
    meta: "3 varieties · cut-and-come",
    category: "Vegetables",
    img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
    care: {
      fertilizers: ["Nitrogen-rich 10-5-5 (monthly)", "Liquid seaweed (after cutting)"],
      insecticides: ["Neem oil (aphids)", "Slug pellets (young plants)"],
    },
    varieties: [
      {
        name: "Bright Lights",
        photo:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Yellow, orange, pink stems",
        season: "Summer – Autumn",
      },
      {
        name: "Rhubarb Chard",
        photo:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Deep crimson stems",
        season: "Summer – Autumn",
      },
      {
        name: "Peppermint",
        photo:
          "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=900&q=80",
        trait: "Green-white striped",
        season: "Summer",
      },
    ],
  },
]
