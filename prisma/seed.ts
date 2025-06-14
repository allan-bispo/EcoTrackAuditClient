const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Limpar dados existentes
  console.log('Limpando dados existentes...');
  await prisma.alertAction.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.industry.deleteMany();
  await prisma.user.deleteMany();
  console.log('Dados antigos removidos com sucesso!');

  // Criar usuário de teste
  const hashedPassword = await bcrypt.hash('123456', 10);

  const user = await prisma.user.create({
    data: {
      email: 'teste@exemplo.com',
      name: 'Usuário Teste',
      password: hashedPassword,
    },
  });

  console.log('Usuário de teste criado com sucesso!');

  // Criar indústrias
  const createdIndustries = await Promise.all([
    prisma.industry.create({
      data: {
        name: "Fábrica Norte",
        type: "Siderúrgica",
        status: "active",
        location: "São Paulo, SP",
        capacity: 500,
        description: "Maior produtora de aço da região",
        maxCO2Emission: 500.0,
        currentCO2Emission: 450.0,
        details: {
          equipment: ["Alto-forno", "Laminador", "Refinador"],
          certifications: ["ISO 14001", "ISO 9001"],
          lastAudit: "2024-02-15"
        }
      }
    }),
    prisma.industry.create({
      data: {
        name: "Fábrica teste",
        type: "Química",
        status: "active",
        location: "São Paulo, SP",
        capacity: 500,
        description: "Maior produtora de aço da região teste",
        maxCO2Emission: 500.0,
        currentCO2Emission: 450.0,
        details: {
          equipment: ["Alto-forno", "Laminador", "Refinador"],
          certifications: ["ISO 14001", "ISO 9001"],
          lastAudit: "2024-02-15"
        }
      }
    }),
    prisma.industry.create({
      data: {
        name: "Fábrica Sul",
        type: "Química",
        status: "warning",
        location: "Rio de Janeiro, RJ",
        capacity: 300,
        description: "Especializada em produtos químicos industriais",
        maxCO2Emission: 2000.0,
        currentCO2Emission: 2100.0,
        details: {
          equipment: ["Reator", "Destilador", "Filtro"],
          certifications: ["ISO 14001"],
          lastAudit: "2024-01-20"
        }
      }
    }),
    prisma.industry.create({
      data: {
        name: "Fábrica Leste",
        type: "Automotiva",
        status: "active",
        location: "Curitiba, PR",
        capacity: 800,
        description: "Montadora de veículos elétricos",
        maxCO2Emission: 1500.0,
        currentCO2Emission: 1200.0,
        details: {
          equipment: ["Linha de Montagem", "Robôs", "Teste"],
          certifications: ["ISO 14001", "ISO 9001", "IATF 16949"],
          lastAudit: "2024-03-01"
        }
      }
    }),
    prisma.industry.create({
      data: {
        name: "Fábrica Oeste",
        type: "Alimentícia",
        status: "inactive",
        location: "Belo Horizonte, MG",
        capacity: 200,
        description: "Processamento de alimentos",
        maxCO2Emission: 800.0,
        currentCO2Emission: 0.0,
        details: {
          equipment: ["Processador", "Empacotador", "Refrigerador"],
          certifications: ["ISO 22000"],
          lastAudit: "2024-02-10"
        }
      }
    })
  ]);

  console.log('Indústrias criadas com sucesso!');

  // Criar alertas
  const alerts = [
    {
      title: "Alerta de Emissão de CO2",
      description: "Emissão de CO2 acima do limite permitido",
      severity: "high",
      status: "pending",
      details: {
        "Nível de Emissão": "120% do limite",
        "Setor": "Produção",
        "Responsável": "João Silva"
      },
      industryId: createdIndustries[0].id,
      actions: []
    },
    {
      title: "Vazamento de Produto Químico",
      description: "Detectado vazamento no setor de armazenamento",
      severity: "critical",
      status: "in_progress",
      details: {
        "Produto": "Ácido Sulfúrico",
        "Quantidade": "50L",
        "Local": "Setor de Armazenamento B"
      },
      industryId: createdIndustries[1].id,
      actions: []
    },
    {
      title: "Falha no Sistema de Filtros",
      description: "Sistema de filtros apresentando falha",
      severity: "medium",
      status: "resolved",
      details: {
        "Tipo de Falha": "Pressão Baixa",
        "Setor": "Tratamento de Efluentes",
        "Ação Tomada": "Manutenção Preventiva"
      },
      industryId: createdIndustries[2].id,
      actions: []
    },
    {
      title: "Alerta de Temperatura",
      description: "Temperatura acima do normal no reator",
      severity: "high",
      status: "pending",
      details: {
        "Temperatura Atual": "180°C",
        "Temperatura Máxima": "150°C",
        "Setor": "Reator Principal"
      },
      industryId: createdIndustries[3].id,
      actions: []
    },
    {
      title: "Falha no Monitoramento",
      description: "Sistema de monitoramento offline",
      severity: "medium",
      status: "in_progress",
      details: {
        "Sistema": "Monitoramento de Emissões",
        "Tempo Offline": "2 horas",
        "Impacto": "Monitoramento Manual Ativo"
      },
      industryId: createdIndustries[0].id,
      actions: []
    },
    {
      title: "Excesso de Emissão de Gases",
      description: "Emissão de gases tóxicos acima do permitido",
      severity: "critical",
      status: "notified",
      details: {
        "Tipo de Gás": "Monóxido de Carbono",
        "Nível": "150% do limite",
        "Setor": "Produção Química"
      },
      industryId: createdIndustries[1].id,
      actions: []
    },
    {
      title: "Falha no Sistema de Tratamento",
      description: "Sistema de tratamento de efluentes inoperante",
      severity: "high",
      status: "notified",
      details: {
        "Tipo de Falha": "Bomba Principal",
        "Impacto": "Efluentes não tratados",
        "Setor": "Tratamento de Água"
      },
      industryId: createdIndustries[2].id,
      actions: []
    },
    {
      title: "Contaminação do Solo",
      description: "Detectada contaminação no solo da área externa",
      severity: "critical",
      status: "notified",
      details: {
        "Tipo de Contaminação": "Produtos Químicos",
        "Área Afetada": "200m²",
        "Local": "Área Externa - Setor Sul"
      },
      industryId: createdIndustries[3].id,
      actions: []
    }
  ];

  // Inserir alertas e suas ações
  for (const alertData of alerts) {
    const { actions, ...alertInfo } = alertData;
    
    const alert = await prisma.alert.create({
      data: {
        ...alertInfo,
        actions: {
          create: actions
        }
      }
    });
    
    console.log(`Alerta criado: ${alert.title}`);
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 