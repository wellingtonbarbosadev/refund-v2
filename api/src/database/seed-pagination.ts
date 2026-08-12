import { prisma } from "./prisma"

const categories = ["food", "others", "services", "transport", "accommodation"] as const

async function main() {
  const employees = await prisma.user.findMany({
    where: { role: "employee" },
    orderBy: { createdAt: "asc" },
  })

  if (employees.length === 0) {
    throw new Error("Cadastre pelo menos um usuário funcionário antes de executar a carga.")
  }

  const existing = await prisma.refunds.count({
    where: { name: { startsWith: "Teste paginação" } },
  })

  if (existing > 0) {
    console.log(`${existing} solicitações de teste já existem. Nada foi alterado.`)
    return
  }

  const requests = Array.from({ length: 37 }, (_, index) => ({
    name: `Teste paginação ${String(index + 1).padStart(2, "0")}`,
    category: categories[index % categories.length],
    amount: Number((25 + index * 13.75).toFixed(2)),
    filename: `comprovante-paginacao-${String(index + 1).padStart(2, "0")}.pdf`,
    userId: employees[index % employees.length].id,
  }))

  await prisma.refunds.createMany({ data: requests })
  console.log(`${requests.length} solicitações de teste criadas.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => prisma.$disconnect())
