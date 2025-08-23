# Script de Seed do Banco de Dados

Este script cria dados iniciais para o sistema Candidate Finder, incluindo usuários, skills, áreas e experiências.

## O que o script cria:

### 🏗️ **Áreas**
**5 áreas principais** com **22 subáreas** (baseadas no que já existe no banco):

**Desenvolvimento de Software (6 subáreas):**
- Desenvolvedor Front-End, Desenvolvedor Back-End, Desenvolvedor Full-Stack
- Desenvolvedor Mobile, Engenheiro de Software, QA / Testes de Software

**Infraestrutura e DevOps (4 subáreas):**
- Administrador de Sistemas, Cloud Engineer, DevOps Engineer, Site Reliability Engineer (SRE)

**Dados e Inteligência Artificial (5 subáreas):**
- Analista de Dados, BI Specialist, Cientista de Dados, Engenheiro de Dados, Machine Learning Engineer

**Segurança da Informação (3 subáreas):**
- Analista SOC, Engenheiro de Segurança, Pentester

**Gestão e Produto (4 subáreas):**
- Gerente de Projetos, Product Owner, Scrum Master, Tech Lead

### 🛠️ **Skills**
- **Frontend**: React, Vue.js, Angular, TypeScript, CSS3, HTML5, JavaScript, Sass/SCSS, Tailwind CSS
- **Backend**: Node.js, Python, Java, C#, Go, PHP, Ruby, Express.js, Django, Spring Boot, ASP.NET Core, FastAPI
- **Mobile**: React Native, Flutter, Swift, Kotlin, Xamarin
- **DevOps**: Docker, Kubernetes, AWS, Azure, Google Cloud, Jenkins, GitHub Actions, Terraform, Ansible
- **Data Science**: Python, R, TensorFlow, PyTorch, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn
- **Banco de Dados**: PostgreSQL, MySQL, MongoDB, Redis, SQLite
- **Outras**: GraphQL, REST API, Git, Linux, Nginx, Apache

### 👥 **Usuários**
**50 usuários** com diferentes perfis organizados por especialização:

**Full Stack Developers (5):**
- João Silva, Roberto Almeida, Fernando Costa, Ricardo Santos, Marcelo Lima

**Frontend Developers (5):**
- Maria Santos, Fernanda Rodrigues, Carolina Alves, Patrícia Oliveira, Amanda Ferreira

**Backend Developers (5):**
- Pedro Oliveira, Lucas Pereira, André Silva, Diego Costa, Rafael Santos

**Mobile Developers (5):**
- Ana Costa, Camila Souza, Gabriela Lima, Isabela Santos, Mariana Costa

**DevOps Engineers (5):**
- Carlos Ferreira, Thiago Silva, Bruno Costa, Felipe Santos, Leonardo Lima

**Data Scientists (5):**
- Juliana Lima, Beatriz Alves, Vanessa Costa, Daniela Santos, Larissa Ferreira

**Security Engineers (5):**
- Alexandre Costa, Rodrigo Silva, Eduardo Santos, Guilherme Lima, Matheus Costa

**Product Managers (5):**
- Sofia Alves, Valentina Costa, Helena Santos, Alice Ferreira, Laura Lima

**QA Engineers (5):**
- Rafaela Costa, Clara Santos, Yasmin Lima, Nina Costa, Bianca Alves

**Cloud Engineers (5):**
- Victor Silva, Gabriel Costa, Henrique Santos, Lucas Lima, João Costa

### 💼 **Experiências**
**100+ experiências profissionais** com diferentes níveis de detalhamento:

**Experiências Detalhadas (20):**
- **10 usuários** com experiências altamente detalhadas incluindo:
  - Tecnologias específicas (React 18, Angular 15+, Vue.js 3, etc.)
  - Arquiteturas implementadas (microserviços, PWA, etc.)
  - Ferramentas utilizadas (Docker, Kubernetes, AWS, Azure, etc.)
  - Metodologias de trabalho (Scrum, Kanban, etc.)
  - Impacto nos negócios (usuários atendidos, métricas, etc.)
  - Contexto específico do setor (fintech, saúde, e-commerce, etc.)

**Experiências Padrão (80):**
- **40 usuários** com experiências padrão mas realistas:
  - Cargos Senior e Pleno
  - Descrições técnicas apropriadas para cada especialização
  - Metodologias ágeis e práticas de desenvolvimento
  - Colaboração em equipes e code reviews

## Como executar:

### Pré-requisitos:
1. Banco de dados rodando
2. Migrações aplicadas
3. Dependências instaladas

### Comando:
```bash
pnpm run db:seed
```

### Ou diretamente:
```bash
npx ts-node prisma/seed.ts
```

## Estrutura dos dados:

### Usuários:
- **Senha padrão**: `senha123` (hash com bcrypt)
- **Emails**: Padrão `nome.sobrenome@email.com`
- **Perfis**: Baseados em papéis reais de desenvolvimento

### Skills por usuário:
**50 usuários** com skills mapeadas por especialização:

**Full Stack (5 usuários):**
- ReactJS, NodeJS, TypeScript, PostgreSQL, Docker, Git
- Angular, C#, ASP.NET, SQL, Docker, Azure
- VueJS, Python, Django, PostgreSQL, Docker, Git
- ReactJS, Java, Spring Boot, MySQL, Docker, Git
- NextJS, NodeJS, TypeScript, MongoDB, Docker, Git

**Frontend (5 usuários):**
- ReactJS, VueJS, TypeScript, TailwindCSS, JavaScript, Material-UI
- VueJS, ReactJS, JavaScript, HTML, CSS, Git
- Angular, TypeScript, Sass, Bootstrap, JavaScript, Git
- ReactJS, NextJS, TypeScript, Styled-Components, JavaScript, Git
- VueJS, NuxtJS, TypeScript, TailwindCSS, JavaScript, Git

**Backend (5 usuários):**
- NodeJS, Python, PostgreSQL, Redis, Docker, ExpressJS
- Java, Spring Boot, MySQL, Docker, Git, REST
- Python, FastAPI, PostgreSQL, Redis, Docker, Git
- C#, ASP.NET, SQL Server, Redis, Docker, Git
- Go, PostgreSQL, Redis, Docker, Kubernetes, Git

**Mobile (5 usuários):**
- React Native, Flutter, JavaScript, TypeScript, Git, Swift
- Swift, Kotlin, React Native, Git, iOS, Android
- Flutter, Dart, Firebase, Git, Android, iOS
- React Native, TypeScript, Redux, Git, Android, iOS
- Swift, SwiftUI, Core Data, Git, iOS, macOS

**DevOps (5 usuários):**
- Docker, Kubernetes, AWS, Jenkins, Terraform, Ansible
- Docker, Kubernetes, GCP, GitLab CI, Terraform, Helm
- Docker, Kubernetes, Azure, GitHub Actions, Terraform, Prometheus
- Docker, Kubernetes, AWS, CircleCI, Terraform, Grafana
- Docker, Kubernetes, GCP, Jenkins, Terraform, ELK Stack

**Data Science (5 usuários):**
- Python, TensorFlow, Pandas, NumPy, Scikit-learn, PostgreSQL
- Python, PyTorch, Pandas, NumPy, Matplotlib, MongoDB
- Python, Scikit-learn, Pandas, NumPy, Seaborn, PostgreSQL
- R, Python, Pandas, NumPy, Tableau, MySQL
- Python, TensorFlow, Pandas, NumPy, Power BI, PostgreSQL

**Security (5 usuários):**
- Python, Ethical Hacking, Network Security, OWASP, SIEM, Git
- Python, Penetration Testing, AWS Security, OWASP, SIEM, Git
- Python, Ethical Hacking, Network Security, OWASP, SIEM, Git
- Python, Penetration Testing, Azure Security, OWASP, SIEM, Git
- Python, Ethical Hacking, Network Security, OWASP, SIEM, Git

**Product Management (5 usuários):**
- Jira, Confluence, Agile Methodologies, Scrum, Kanban, Git
- Jira, Confluence, Agile Methodologies, Scrum, Kanban, Git
- Jira, Confluence, Agile Methodologies, Scrum, Kanban, Git
- Jira, Confluence, Agile Methodologies, Scrum, Kanban, Git
- Jira, Confluence, Agile Methodologies, Scrum, Kanban, Git

**QA (5 usuários):**
- Selenium, Cypress, Jest, Postman, Git, Jenkins
- Playwright, Cypress, Jest, Postman, Git, GitHub Actions
- Selenium, Cypress, Jest, Postman, Git, CircleCI
- Playwright, Cypress, Jest, Postman, Git, GitLab CI
- Selenium, Cypress, Jest, Postman, Git, Jenkins

**Cloud (5 usuários):**
- AWS, Terraform, Docker, Kubernetes, Python, Git
- Azure, Terraform, Docker, Kubernetes, PowerShell, Git
- GCP, Terraform, Docker, Kubernetes, Python, Git
- AWS, Terraform, Docker, Kubernetes, Python, Git
- Azure, Terraform, Docker, Kubernetes, PowerShell, Git

### Experiências:
**Experiências Detalhadas (20):**
- **Setores variados**: e-commerce, saúde, financeiro, streaming, EdTech, construção civil, administração imobiliária, fitness, mídia digital, consultoria de TI
- **Tecnologias específicas**: React 18, Angular 15+, Vue.js 3, Next.js 13, TypeScript, Python, Java, C#, Go, Swift, Kotlin
- **Arquiteturas**: microserviços, PWA, streaming HLS, APIs RESTful, sistemas de cache
- **Ferramentas**: Docker, Kubernetes, AWS, Azure, GCP, Redis, PostgreSQL, MongoDB, MySQL
- **Metodologias**: Scrum, Kanban, CI/CD, code reviews, testes automatizados

**Experiências Padrão (80):**
- **Perfis realistas** para cada especialização
- **Metodologias ágeis** e práticas de desenvolvimento
- **Colaboração em equipes** e mentoria

## Observações:

1. **User Summary**: Não é gerado pelo seed (será criado por script separado)
2. **Senhas**: Todas as senhas são `senha123` (hash com bcrypt)
3. **Duplicação**: O script verifica se os dados já existem antes de criar
4. **Relacionamentos**: Skills e áreas são vinculados aos usuários automaticamente
5. **Datas**: Experiências têm datas realistas (2019-2024)

## Personalização:

Para adicionar mais dados ou modificar os existentes, edite as constantes no arquivo `prisma/seed.ts`:
- `areasData`: Para novas áreas
- `skillsData`: Para novas skills
- `usersData`: Para novos usuários
- `experiencesData`: Para novas experiências

## Troubleshooting:

Se houver erros:
1. Verifique se o banco está rodando
2. Confirme se as migrações foram aplicadas
3. Verifique as variáveis de ambiente (DATABASE_URL)
4. Confirme se todas as dependências estão instaladas
