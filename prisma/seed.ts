const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.upsert({
    where: { email: 'teste@exemplo.com' },
    update: {},
    create: {
      email: 'teste@exemplo.com',
      name: 'Usuário Teste',
      password: hashedPassword,
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 