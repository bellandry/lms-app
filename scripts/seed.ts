const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "programmation" },
        { name: "Comptabilité" },
        { name: "Sécurité informatique" },
        { name: "Intelligence artificielle" },
        { name: "Photographie" },
        { name: "Infographie" },
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