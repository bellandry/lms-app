const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "programmation" },
        { name: "Sécurité informatique" },
        { name: "Intelligence artificielle" },
        { name: "Cloud computing" },
        { name: "React" },
      ]
    })

    console.log("success")
  } catch (error) {
    console.log("error seeding database", error)
  } finally {
    await database.$disconnect()
  }
}

main()