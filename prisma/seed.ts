import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { experiencesData } from './experiences-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Buscar skills e áreas existentes
  console.log('🔍 Buscando skills e áreas existentes...');
  const existingSkills = await prisma.skill.findMany();
  const existingAreas = await prisma.area.findMany();
  
  console.log(`📊 Encontradas ${existingSkills.length} skills e ${existingAreas.length} áreas`);
  
  // Criar usuários
  console.log('👥 Criando usuários...');
  const users = await createUsers();
  
  // Adicionar skills aos usuários (usando skills existentes)
  console.log('🔗 Adicionando skills aos usuários...');
  await addSkillsToUsers(users, existingSkills);
  
  // Adicionar áreas aos usuários (usando áreas existentes)
  console.log('📍 Adicionando áreas aos usuários...');
  await addAreasToUsers(users, existingAreas);
  
  // Criar experiências
  console.log('💼 Criando experiências...');
  await createExperiences(users, existingSkills);

  console.log('✅ Seed concluído com sucesso!');
}

async function createUsers() {
  const usersData = [
    // Full Stack Developers
    { name: 'João Silva', email: 'joao.silva@email.com', password: 'senha123', role: 'Full Stack Developer' },
    { name: 'Roberto Almeida', email: 'roberto.almeida@email.com', password: 'senha123', role: 'Full Stack Developer' },
    { name: 'Fernando Costa', email: 'fernando.costa@email.com', password: 'senha123', role: 'Full Stack Developer' },
    { name: 'Ricardo Santos', email: 'ricardo.santos@email.com', password: 'senha123', role: 'Full Stack Developer' },
    { name: 'Marcelo Lima', email: 'marcelo.lima@email.com', password: 'senha123', role: 'Full Stack Developer' },
    
    // Frontend Developers
    { name: 'Maria Santos', email: 'maria.santos@email.com', password: 'senha123', role: 'Frontend Developer' },
    { name: 'Fernanda Rodrigues', email: 'fernanda.rodrigues@email.com', password: 'senha123', role: 'Frontend Developer' },
    { name: 'Carolina Alves', email: 'carolina.alves@email.com', password: 'senha123', role: 'Frontend Developer' },
    { name: 'Patrícia Oliveira', email: 'patricia.oliveira@email.com', password: 'senha123', role: 'Frontend Developer' },
    { name: 'Amanda Ferreira', email: 'amanda.ferreira@email.com', password: 'senha123', role: 'Frontend Developer' },
    
    // Backend Developers
    { name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', password: 'senha123', role: 'Backend Developer' },
    { name: 'Lucas Pereira', email: 'lucas.pereira@email.com', password: 'senha123', role: 'Backend Developer' },
    { name: 'André Silva', email: 'andre.silva@email.com', password: 'senha123', role: 'Backend Developer' },
    { name: 'Diego Costa', email: 'diego.costa@email.com', password: 'senha123', role: 'Backend Developer' },
    { name: 'Rafael Santos', email: 'rafael.santos@email.com', password: 'senha123', role: 'Backend Developer' },
    
    // Mobile Developers
    { name: 'Ana Costa', email: 'ana.costa@email.com', password: 'senha123', role: 'Mobile Developer' },
    { name: 'Camila Souza', email: 'camila.souza@email.com', password: 'senha123', role: 'Mobile Developer' },
    { name: 'Gabriela Lima', email: 'gabriela.lima@email.com', password: 'senha123', role: 'Mobile Developer' },
    { name: 'Isabela Santos', email: 'isabela.santos@email.com', password: 'senha123', role: 'Mobile Developer' },
    { name: 'Mariana Costa', email: 'mariana.costa@email.com', password: 'senha123', role: 'Mobile Developer' },
    
    // DevOps Engineers
    { name: 'Carlos Ferreira', email: 'carlos.ferreira@email.com', password: 'senha123', role: 'DevOps Engineer' },
    { name: 'Thiago Silva', email: 'thiago.silva@email.com', password: 'senha123', role: 'DevOps Engineer' },
    { name: 'Bruno Costa', email: 'bruno.costa@email.com', password: 'senha123', role: 'DevOps Engineer' },
    { name: 'Felipe Santos', email: 'felipe.santos@email.com', password: 'senha123', role: 'DevOps Engineer' },
    { name: 'Leonardo Lima', email: 'leonardo.lima@email.com', password: 'senha123', role: 'DevOps Engineer' },
    
    // Data Scientists
    { name: 'Juliana Lima', email: 'juliana.lima@email.com', password: 'senha123', role: 'Data Scientist' },
    { name: 'Beatriz Alves', email: 'beatriz.alves@email.com', password: 'senha123', role: 'Data Scientist' },
    { name: 'Vanessa Costa', email: 'vanessa.costa@email.com', password: 'senha123', role: 'Data Scientist' },
    { name: 'Daniela Santos', email: 'daniela.santos@email.com', password: 'senha123', role: 'Data Scientist' },
    { name: 'Larissa Ferreira', email: 'larissa.ferreira@email.com', password: 'senha123', role: 'Data Scientist' },
    
    // Security Engineers
    { name: 'Alexandre Costa', email: 'alexandre.costa@email.com', password: 'senha123', role: 'Security Engineer' },
    { name: 'Rodrigo Silva', email: 'rodrigo.silva@email.com', password: 'senha123', role: 'Security Engineer' },
    { name: 'Eduardo Santos', email: 'eduardo.santos@email.com', password: 'senha123', role: 'Security Engineer' },
    { name: 'Guilherme Lima', email: 'guilherme.lima@email.com', password: 'senha123', role: 'Security Engineer' },
    { name: 'Matheus Costa', email: 'matheus.costa@email.com', password: 'senha123', role: 'Security Engineer' },
    
    // Product Managers
    { name: 'Sofia Alves', email: 'sofia.alves@email.com', password: 'senha123', role: 'Product Manager' },
    { name: 'Valentina Costa', email: 'valentina.costa@email.com', password: 'senha123', role: 'Product Manager' },
    { name: 'Helena Santos', email: 'helena.santos@email.com', password: 'senha123', role: 'Product Manager' },
    { name: 'Alice Ferreira', email: 'alice.ferreira@email.com', password: 'senha123', role: 'Product Manager' },
    { name: 'Laura Lima', email: 'laura.lima@email.com', password: 'senha123', role: 'Product Manager' },
    
    // QA Engineers
    { name: 'Rafaela Costa', email: 'rafaela.costa@email.com', password: 'senha123', role: 'QA Engineer' },
    { name: 'Clara Santos', email: 'clara.santos@email.com', password: 'senha123', role: 'QA Engineer' },
    { name: 'Yasmin Lima', email: 'yasmin.lima@email.com', password: 'senha123', role: 'QA Engineer' },
    { name: 'Nina Costa', email: 'nina.costa@email.com', password: 'senha123', role: 'QA Engineer' },
    { name: 'Bianca Alves', email: 'bianca.alves@email.com', password: 'senha123', role: 'QA Engineer' },
    
    // Cloud Engineers
    { name: 'Victor Silva', email: 'victor.silva@email.com', password: 'senha123', role: 'Cloud Engineer' },
    { name: 'Gabriel Costa', email: 'gabriel.costa@email.com', password: 'senha123', role: 'Cloud Engineer' },
    { name: 'Henrique Santos', email: 'henrique.santos@email.com', password: 'senha123', role: 'Cloud Engineer' },
    { name: 'Lucas Lima', email: 'lucas.lima@email.com', password: 'senha123', role: 'Cloud Engineer' },
    { name: 'João Costa', email: 'joao.costa@email.com', password: 'senha123', role: 'Cloud Engineer' }
  ];

  const createdUsers: any[] = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Verificar se o usuário já existe
    let user = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword
        }
      });
    }
    
    createdUsers.push({ ...user, role: userData.role });
  }

  return createdUsers;
}

async function addSkillsToUsers(users: any[], existingSkills: any[]) {
  // Mapear usuários para skills baseado em seus papéis
  const userSkillMappings = [
    // Full Stack Developers
    { userEmail: 'joao.silva@email.com', skillNames: ['ReactJS', 'NodeJS', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'] },
    { userEmail: 'roberto.almeida@email.com', skillNames: ['Angular', 'C#', 'ASP.NET', 'SQL', 'Docker', 'Azure'] },
    { userEmail: 'fernando.costa@email.com', skillNames: ['VueJS', 'Python', 'Django', 'PostgreSQL', 'Docker', 'Git'] },
    { userEmail: 'ricardo.santos@email.com', skillNames: ['ReactJS', 'Java', 'Spring Boot', 'MySQL', 'Docker', 'Git'] },
    { userEmail: 'marcelo.lima@email.com', skillNames: ['NextJS', 'NodeJS', 'TypeScript', 'MongoDB', 'Docker', 'Git'] },
    
    // Frontend Developers
    { userEmail: 'maria.santos@email.com', skillNames: ['ReactJS', 'VueJS', 'TypeScript', 'TailwindCSS', 'JavaScript', 'Material-UI'] },
    { userEmail: 'fernanda.rodrigues@email.com', skillNames: ['VueJS', 'ReactJS', 'JavaScript', 'HTML', 'CSS', 'Git'] },
    { userEmail: 'carolina.alves@email.com', skillNames: ['Angular', 'TypeScript', 'Sass', 'Bootstrap', 'JavaScript', 'Git'] },
    { userEmail: 'patricia.oliveira@email.com', skillNames: ['ReactJS', 'NextJS', 'TypeScript', 'Styled-Components', 'JavaScript', 'Git'] },
    { userEmail: 'amanda.ferreira@email.com', skillNames: ['VueJS', 'NuxtJS', 'TypeScript', 'TailwindCSS', 'JavaScript', 'Git'] },
    
    // Backend Developers
    { userEmail: 'pedro.oliveira@email.com', skillNames: ['NodeJS', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'ExpressJS'] },
    { userEmail: 'lucas.pereira@email.com', skillNames: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Git', 'REST'] },
    { userEmail: 'andre.silva@email.com', skillNames: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Git'] },
    { userEmail: 'diego.costa@email.com', skillNames: ['C#', 'ASP.NET', 'SQL Server', 'Redis', 'Docker', 'Git'] },
    { userEmail: 'rafael.santos@email.com', skillNames: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'Git'] },
    
    // Mobile Developers
    { userEmail: 'ana.costa@email.com', skillNames: ['React Native', 'Flutter', 'JavaScript', 'TypeScript', 'Git', 'Swift'] },
    { userEmail: 'camila.souza@email.com', skillNames: ['Swift', 'Kotlin', 'React Native', 'Git', 'iOS', 'Android'] },
    { userEmail: 'gabriela.lima@email.com', skillNames: ['Flutter', 'Dart', 'Firebase', 'Git', 'Android', 'iOS'] },
    { userEmail: 'isabela.santos@email.com', skillNames: ['React Native', 'TypeScript', 'Redux', 'Git', 'Android', 'iOS'] },
    { userEmail: 'mariana.costa@email.com', skillNames: ['Swift', 'SwiftUI', 'Core Data', 'Git', 'iOS', 'macOS'] },
    
    // DevOps Engineers
    { userEmail: 'carlos.ferreira@email.com', skillNames: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Ansible'] },
    { userEmail: 'thiago.silva@email.com', skillNames: ['Docker', 'Kubernetes', 'GCP', 'GitLab CI', 'Terraform', 'Helm'] },
    { userEmail: 'bruno.costa@email.com', skillNames: ['Docker', 'Kubernetes', 'Azure', 'GitHub Actions', 'Terraform', 'Prometheus'] },
    { userEmail: 'felipe.santos@email.com', skillNames: ['Docker', 'Kubernetes', 'AWS', 'CircleCI', 'Terraform', 'Grafana'] },
    { userEmail: 'leonardo.lima@email.com', skillNames: ['Docker', 'Kubernetes', 'GCP', 'Jenkins', 'Terraform', 'ELK Stack'] },
    
    // Data Scientists
    { userEmail: 'juliana.lima@email.com', skillNames: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn', 'PostgreSQL'] },
    { userEmail: 'beatriz.alves@email.com', skillNames: ['Python', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'MongoDB'] },
    { userEmail: 'vanessa.costa@email.com', skillNames: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Seaborn', 'PostgreSQL'] },
    { userEmail: 'daniela.santos@email.com', skillNames: ['R', 'Python', 'Pandas', 'NumPy', 'Tableau', 'MySQL'] },
    { userEmail: 'larissa.ferreira@email.com', skillNames: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Power BI', 'PostgreSQL'] },
    
    // Security Engineers
    { userEmail: 'alexandre.costa@email.com', skillNames: ['Python', 'Ethical Hacking', 'Network Security', 'OWASP', 'SIEM', 'Git'] },
    { userEmail: 'rodrigo.silva@email.com', skillNames: ['Python', 'Penetration Testing', 'AWS Security', 'OWASP', 'SIEM', 'Git'] },
    { userEmail: 'eduardo.santos@email.com', skillNames: ['Python', 'Ethical Hacking', 'Network Security', 'OWASP', 'SIEM', 'Git'] },
    { userEmail: 'guilherme.lima@email.com', skillNames: ['Python', 'Penetration Testing', 'Azure Security', 'OWASP', 'SIEM', 'Git'] },
    { userEmail: 'matheus.costa@email.com', skillNames: ['Python', 'Ethical Hacking', 'Network Security', 'OWASP', 'SIEM', 'Git'] },
    
    // Product Managers
    { userEmail: 'sofia.alves@email.com', skillNames: ['Jira', 'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Git'] },
    { userEmail: 'valentina.costa@email.com', skillNames: ['Jira', 'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Git'] },
    { userEmail: 'helena.santos@email.com', skillNames: ['Jira', 'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Git'] },
    { userEmail: 'alice.ferreira@email.com', skillNames: ['Jira', 'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Git'] },
    { userEmail: 'laura.lima@email.com', skillNames: ['Jira', 'Confluence', 'Agile Methodologies', 'Scrum', 'Kanban', 'Git'] },
    
    // QA Engineers
    { userEmail: 'rafaela.costa@email.com', skillNames: ['Selenium', 'Cypress', 'Jest', 'Postman', 'Git', 'Jenkins'] },
    { userEmail: 'clara.santos@email.com', skillNames: ['Playwright', 'Cypress', 'Jest', 'Postman', 'Git', 'GitHub Actions'] },
    { userEmail: 'yasmin.lima@email.com', skillNames: ['Selenium', 'Cypress', 'Jest', 'Postman', 'Git', 'CircleCI'] },
    { userEmail: 'nina.costa@email.com', skillNames: ['Playwright', 'Cypress', 'Jest', 'Postman', 'Git', 'GitLab CI'] },
    { userEmail: 'bianca.alves@email.com', skillNames: ['Selenium', 'Cypress', 'Jest', 'Postman', 'Git', 'Jenkins'] },
    
    // Cloud Engineers
    { userEmail: 'victor.silva@email.com', skillNames: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'Git'] },
    { userEmail: 'gabriel.costa@email.com', skillNames: ['Azure', 'Terraform', 'Docker', 'Kubernetes', 'PowerShell', 'Git'] },
    { userEmail: 'henrique.santos@email.com', skillNames: ['GCP', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'Git'] },
    { userEmail: 'lucas.lima@email.com', skillNames: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'Git'] },
    { userEmail: 'joao.costa@email.com', skillNames: ['Azure', 'Terraform', 'Docker', 'Kubernetes', 'PowerShell', 'Git'] }
  ];

  for (const mapping of userSkillMappings) {
    const user = users.find(u => u.email === mapping.userEmail);
    if (!user) continue;

    for (const skillName of mapping.skillNames) {
      const skill = existingSkills.find(s => s.name === skillName);
      if (!skill) {
        console.log(`⚠️ Skill não encontrada: ${skillName}`);
        continue;
      }

      // Verificar se a relação já existe
      const existingUserSkill = await prisma.userSkill.findFirst({
        where: {
          userId: user.id,
          skillId: skill.id
        }
      });
      
      if (!existingUserSkill) {
        await prisma.userSkill.create({
          data: {
            userId: user.id,
            skillId: skill.id
          }
        });
        console.log(`✅ ${user.name} -> ${skill.name}`);
      }
    }
  }
}

async function addAreasToUsers(users: any[], existingAreas: any[]) {
  // Mapear usuários para áreas baseado em seus papéis (usando os nomes exatos do banco)
  const userAreaMappings = [
    // Full Stack Developers
    { userEmail: 'joao.silva@email.com', areaNames: ['Desenvolvedor Full-Stack'] },
    { userEmail: 'roberto.almeida@email.com', areaNames: ['Desenvolvedor Full-Stack'] },
    { userEmail: 'fernando.costa@email.com', areaNames: ['Desenvolvedor Full-Stack'] },
    { userEmail: 'ricardo.santos@email.com', areaNames: ['Desenvolvedor Full-Stack'] },
    { userEmail: 'marcelo.lima@email.com', areaNames: ['Desenvolvedor Full-Stack'] },
    
    // Frontend Developers
    { userEmail: 'maria.santos@email.com', areaNames: ['Desenvolvedor Front-End'] },
    { userEmail: 'fernanda.rodrigues@email.com', areaNames: ['Desenvolvedor Front-End'] },
    { userEmail: 'carolina.alves@email.com', areaNames: ['Desenvolvedor Front-End'] },
    { userEmail: 'patricia.oliveira@email.com', areaNames: ['Desenvolvedor Front-End'] },
    { userEmail: 'amanda.ferreira@email.com', areaNames: ['Desenvolvedor Front-End'] },
    
    // Backend Developers
    { userEmail: 'pedro.oliveira@email.com', areaNames: ['Desenvolvedor Back-End'] },
    { userEmail: 'lucas.pereira@email.com', areaNames: ['Desenvolvedor Back-End'] },
    { userEmail: 'andre.silva@email.com', areaNames: ['Desenvolvedor Back-End'] },
    { userEmail: 'diego.costa@email.com', areaNames: ['Desenvolvedor Back-End'] },
    { userEmail: 'rafael.santos@email.com', areaNames: ['Desenvolvedor Back-End'] },
    
    // Mobile Developers
    { userEmail: 'ana.costa@email.com', areaNames: ['Desenvolvedor Mobile'] },
    { userEmail: 'camila.souza@email.com', areaNames: ['Desenvolvedor Mobile'] },
    { userEmail: 'gabriela.lima@email.com', areaNames: ['Desenvolvedor Mobile'] },
    { userEmail: 'isabela.santos@email.com', areaNames: ['Desenvolvedor Mobile'] },
    { userEmail: 'mariana.costa@email.com', areaNames: ['Desenvolvedor Mobile'] },
    
    // DevOps Engineers
    { userEmail: 'carlos.ferreira@email.com', areaNames: ['DevOps Engineer'] },
    { userEmail: 'thiago.silva@email.com', areaNames: ['DevOps Engineer'] },
    { userEmail: 'bruno.costa@email.com', areaNames: ['DevOps Engineer'] },
    { userEmail: 'felipe.santos@email.com', areaNames: ['DevOps Engineer'] },
    { userEmail: 'leonardo.lima@email.com', areaNames: ['DevOps Engineer'] },
    
    // Data Scientists
    { userEmail: 'juliana.lima@email.com', areaNames: ['Cientista de Dados'] },
    { userEmail: 'beatriz.alves@email.com', areaNames: ['Cientista de Dados'] },
    { userEmail: 'vanessa.costa@email.com', areaNames: ['Cientista de Dados'] },
    { userEmail: 'daniela.santos@email.com', areaNames: ['Cientista de Dados'] },
    { userEmail: 'larissa.ferreira@email.com', areaNames: ['Cientista de Dados'] },
    
    // Security Engineers
    { userEmail: 'alexandre.costa@email.com', areaNames: ['Engenheiro de Segurança'] },
    { userEmail: 'rodrigo.silva@email.com', areaNames: ['Engenheiro de Segurança'] },
    { userEmail: 'eduardo.santos@email.com', areaNames: ['Engenheiro de Segurança'] },
    { userEmail: 'guilherme.lima@email.com', areaNames: ['Engenheiro de Segurança'] },
    { userEmail: 'matheus.costa@email.com', areaNames: ['Engenheiro de Segurança'] },
    
    // Product Managers
    { userEmail: 'sofia.alves@email.com', areaNames: ['Product Owner'] },
    { userEmail: 'valentina.costa@email.com', areaNames: ['Product Owner'] },
    { userEmail: 'helena.santos@email.com', areaNames: ['Product Owner'] },
    { userEmail: 'alice.ferreira@email.com', areaNames: ['Product Owner'] },
    { userEmail: 'laura.lima@email.com', areaNames: ['Product Owner'] },
    
    // QA Engineers
    { userEmail: 'rafaela.costa@email.com', areaNames: ['QA / Testes de Software'] },
    { userEmail: 'clara.santos@email.com', areaNames: ['QA / Testes de Software'] },
    { userEmail: 'yasmin.lima@email.com', areaNames: ['QA / Testes de Software'] },
    { userEmail: 'nina.costa@email.com', areaNames: ['QA / Testes de Software'] },
    { userEmail: 'bianca.alves@email.com', areaNames: ['QA / Testes de Software'] },
    
    // Cloud Engineers
    { userEmail: 'victor.silva@email.com', areaNames: ['Cloud Engineer'] },
    { userEmail: 'gabriel.costa@email.com', areaNames: ['Cloud Engineer'] },
    { userEmail: 'henrique.santos@email.com', areaNames: ['Cloud Engineer'] },
    { userEmail: 'lucas.lima@email.com', areaNames: ['Cloud Engineer'] },
    { userEmail: 'joao.costa@email.com', areaNames: ['Cloud Engineer'] }
  ];

  for (const mapping of userAreaMappings) {
    const user = users.find(u => u.email === mapping.userEmail);
    if (!user) continue;

    for (const areaName of mapping.areaNames) {
      const area = existingAreas.find(a => a.name === areaName);
      if (!area) {
        console.log(`⚠️ Área não encontrada: ${areaName}`);
        continue;
      }

      // Verificar se a relação já existe
      const existingUserArea = await prisma.userArea.findFirst({
        where: {
          userId: user.id,
          areaId: area.id
        }
      });
      
      if (!existingUserArea) {
        await prisma.userArea.create({
          data: {
            userId: user.id,
            areaId: area.id
          }
        });
        console.log(`✅ ${user.name} -> ${area.name}`);
      }
    }
  }
}

async function createExperiences(users: any[], existingSkills: any[]) {
  // Usar as experiências importadas do arquivo experiences-data.ts
  for (const userExperience of experiencesData) {
    const user = users.find(u => u.email === userExperience.userEmail);
    if (!user) {
      console.log(`⚠️ Usuário não encontrado: ${userExperience.userEmail}`);
      continue;
    }

    for (const experienceData of userExperience.experiences) {
      await prisma.experience.create({
        data: {
          title: experienceData.title,
          description: experienceData.description,
          startDate: experienceData.startDate,
          endDate: experienceData.endDate,
          userId: user.id
        }
      });
      console.log(`✅ Experiência criada: ${user.name} -> ${experienceData.title}`);
    }
  }
  
  // Criar experiências para os usuários restantes (que não estão no arquivo de dados)
  const usersWithoutExperiences = users.filter(user => 
    !experiencesData.some(exp => exp.userEmail === user.email)
  );
  
  for (const user of usersWithoutExperiences) {
    // Criar 2 experiências padrão para cada usuário restante
    const defaultExperiences = [
      {
        title: `${user.role} Senior`,
        description: `Atuei como ${user.role} senior em uma empresa de tecnologia, liderando projetos complexos e mentorando desenvolvedores júnior. Implementei arquiteturas escaláveis, melhorei processos de desenvolvimento, e participei de decisões técnicas estratégicas. Trabalhei com metodologias ágeis, participei de code reviews, e colaborei com equipes multidisciplinares para entregar soluções de alta qualidade.`,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2024-01-01')
      },
      {
        title: `${user.role} Pleno`,
        description: `Desenvolvi aplicações e sistemas como ${user.role} pleno, participando de projetos de médio porte e colaborando com equipes de desenvolvimento. Implementei funcionalidades complexas, participei de code reviews, e trabalhei com metodologias ágeis. Colaborei na definição de arquiteturas técnicas e participei de melhorias de processos de desenvolvimento.`,
        startDate: new Date('2020-01-01'),
        endDate: new Date('2021-12-31')
      }
    ];
    
    for (const experienceData of defaultExperiences) {
      await prisma.experience.create({
        data: {
          title: experienceData.title,
          description: experienceData.description,
          startDate: experienceData.startDate,
          endDate: experienceData.endDate,
          userId: user.id
        }
      });
      console.log(`✅ Experiência padrão criada: ${user.name} -> ${experienceData.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
