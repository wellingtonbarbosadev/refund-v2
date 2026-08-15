import "dotenv/config"
import { hash } from "bcrypt"

import { prisma } from "./prisma"

const employeeEmail = "employee@refund.local"
const managerEmail = "manager@refund.local"
const categories = ["food", "others", "services", "transport", "accommodation"] as const

async function main() {
  const password = process.env.DEMO_PASSWORD

  if (!password || password.length < 6) {
    throw new Error("DEMO_PASSWORD deve ter pelo menos 6 caracteres no arquivo .env")
  }

  const passwordHash = await hash(password, 8)

  const employee = await prisma.user.upsert({
    where: { email: employeeEmail },
    update: {
      name: "Marina Costa",
      password: passwordHash,
      role: "employee",
    },
    create: {
      name: "Marina Costa",
      email: employeeEmail,
      password: passwordHash,
      role: "employee",
    },
  })

  await prisma.user.upsert({
    where: { email: managerEmail },
    update: {
      name: "Rafael Almeida",
      password: passwordHash,
      role: "manager",
    },
    create: {
      name: "Rafael Almeida",
      email: managerEmail,
      password: passwordHash,
      role: "manager",
    },
  })

  await prisma.refunds.deleteMany({
    where: {
      userId: employee.id,
      name: { startsWith: "Demonstração" },
    },
  })

  const refunds = Array.from({ length: 15 }, (_, index) => ({
    name: `Demonstração ${String(index + 1).padStart(2, "0")}`,
    amount: Number((42.5 + index * 17.35).toFixed(2)),
    category: categories[index % categories.length],
    filename: `comprovante-demo-${String(index + 1).padStart(2, "0")}.png`,
    userId: employee.id,
  }))

  await prisma.refunds.createMany({ data: refunds })

  console.log("Dados de demonstração criados.")
  console.log(`Funcionário: ${employeeEmail}`)
  console.log(`Gerente: ${managerEmail}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => prisma.$disconnect())
