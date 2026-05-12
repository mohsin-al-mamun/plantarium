import "dotenv/config"
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { PLANTS } from "../app/data/plants"
import { PRODUCTS } from "../app/data/care"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Clearing existing data...")
  await prisma.plantProduct.deleteMany()
  await prisma.varietyPhoto.deleteMany()
  await prisma.variety.deleteMany()
  await prisma.product.deleteMany()
  await prisma.plant.deleteMany()

  console.log("Seeding plants + varieties...")
  for (const plant of PLANTS) {
    await prisma.plant.create({
      data: {
        slug: plant.slug,
        name: plant.name,
        description: plant.description,
        meta: plant.meta,
        category: plant.category,
        img: plant.img,
        varieties: {
          create: plant.varieties.map((v, i) => ({
            name: v.name,
            photo: v.photo,
            trait: v.trait,
            season: v.season,
            note: v.note,
            position: i,
            ...(v.photos?.length && {
              photos: {
                create: v.photos.map((url, j) => ({ url, position: j })),
              },
            }),
          })),
        },
      },
    })
  }

  console.log("Seeding products...")
  for (const product of PRODUCTS) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        kind: product.kind,
        type: product.type,
        dosage: product.dosage,
        frequency: product.frequency,
        notes: product.notes,
      },
    })
  }

  console.log("Seeding plant↔product links...")
  for (const product of PRODUCTS) {
    for (const slug of product.plants) {
      const plant = await prisma.plant.findUnique({ where: { slug } })
      if (!plant) {
        console.warn(`  skipping unknown slug: ${slug}`)
        continue
      }
      await prisma.plantProduct.create({
        data: { plantId: plant.id, productId: product.id },
      })
    }
  }

  console.log("Done.")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
