import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"
import { neonConfig } from "@neondatabase/serverless"
import ws from "ws"
import bcrypt from "bcryptjs"

neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL
if (!connectionString) throw new Error("DATABASE_URL is not set")
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database…")

  const adminHash = await bcrypt.hash("Admin@12345", 12)
  const modHash = await bcrypt.hash("Moderator@123", 12)

  const admin = await prisma.user.upsert({
    where: { email: "admin@cacttus.education" },
    update: {},
    create: {
      fullName: "Admin Cacttus",
      email: "admin@cacttus.education",
      password: adminHash,
      role: "ADMIN",
    },
  })

  const mod1 = await prisma.user.upsert({
    where: { email: "mod1@cacttus.education" },
    update: {},
    create: {
      fullName: "Arta Berisha",
      email: "mod1@cacttus.education",
      password: modHash,
      role: "MODERATOR",
    },
  })

  const mod2 = await prisma.user.upsert({
    where: { email: "mod2@cacttus.education" },
    update: {},
    create: {
      fullName: "Besim Hoxha",
      email: "mod2@cacttus.education",
      password: modHash,
      role: "MODERATOR",
    },
  })

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "lajmet" },
      update: {},
      create: { name: "Lajmet", slug: "lajmet" },
    }),
    prisma.category.upsert({
      where: { slug: "teknologji" },
      update: {},
      create: { name: "Teknologji", slug: "teknologji" },
    }),
    prisma.category.upsert({
      where: { slug: "karriera" },
      update: {},
      create: { name: "Karriera", slug: "karriera" },
    }),
    prisma.category.upsert({
      where: { slug: "projekte" },
      update: {},
      create: { name: "Projekte", slug: "projekte" },
    }),
  ])

  const samplePosts = [
    {
      title: "Mirë se vini në Cacttus Education",
      slug: "mire-se-vini-ne-cacttus-education",
      excerpt: "Cacttus Education është institucioni lider në IT në Kosovë.",
      content:
        "<h2>Rreth nesh</h2><p>Cacttus Education ofron programe dy-vjeçare të akredituara dhe trajnime profesionale në fushën e teknologjisë informative.</p>",
      status: "PUBLISHED" as const,
      featured: true,
      authorId: admin.id,
      categoryId: categories[0].id,
    },
    {
      title: "Programimi me JavaScript — Hapi i parë",
      slug: "programimi-me-javascript-hapi-i-pare",
      excerpt: "Mëso bazat e JavaScript dhe fillo rrugëtimin tënd si zhvillues.",
      content:
        "<h2>JavaScript 101</h2><p>JavaScript është gjuha e programimit bazë e uebit. Me JavaScript mund të krijosh ndërveprim dinamik në faqet web.</p><pre><code>console.log('Përshëndetje nga Cacttus!')</code></pre>",
      status: "PUBLISHED" as const,
      featured: false,
      authorId: mod1.id,
      categoryId: categories[1].id,
    },
    {
      title: "Si të gjesh punën e parë në IT",
      slug: "si-te-gjesh-punen-e-pare-ne-it",
      excerpt: "Udhëzues praktik për studentët që po kërkojnë punësim në sektorin IT.",
      content:
        "<h2>Këshilla për karrierë</h2><p>Sektori IT në Kosovë po rritet me shpejtësi. Ja si mund të rrisësh shanset tuaja për punësim.</p><ul><li>Ndërtoni portfolio të fortë</li><li>Mësoni teknologjitë e kërkuara</li><li>Rrjetëzohuni me profesionistë</li></ul>",
      status: "PUBLISHED" as const,
      featured: false,
      authorId: mod2.id,
      categoryId: categories[2].id,
    },
    {
      title: "Projekti ynë i fundit: Platforma e-learning",
      slug: "projekti-yne-i-fundit-platforma-e-learning",
      excerpt: "Studentët tanë kanë ndërtuar një platformë moderne të-mësuari online.",
      content:
        "<h2>Projekti i vitit</h2><p>Grupi i studentëve të vitit të dytë ka zhvilluar një platformë e-learning duke përdorur React, Next.js dhe PostgreSQL.</p>",
      status: "DRAFT" as const,
      featured: false,
      authorId: mod1.id,
      categoryId: categories[3].id,
    },
    {
      title: "Siguria Kibernetike — Karriera e së ardhmes",
      slug: "siguria-kibernetike-karriera-e-se-ardhmes",
      excerpt: "Pse siguria kibernetike është një nga karrierat më të kërkuara globalisht.",
      content:
        "<h2>Pse Cybersecurity?</h2><p>Me rritjen e kërcënimeve dixhitale, ekspertët e sigurisë kibernetike janë në kërkesë të lartë kudo në botë.</p>",
      status: "DRAFT" as const,
      featured: false,
      authorId: mod2.id,
      categoryId: categories[1].id,
    },
  ]

  for (const postData of samplePosts) {
    await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    })
  }

  console.log("✅ Seeding complete!")
  console.log("\n📋 Credentials:")
  console.log("  Admin:      admin@cacttus.education / Admin@12345")
  console.log("  Moderator1: mod1@cacttus.education  / Moderator@123")
  console.log("  Moderator2: mod2@cacttus.education  / Moderator@123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
