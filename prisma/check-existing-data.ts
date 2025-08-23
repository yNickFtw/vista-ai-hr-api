import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkExistingData() {
  console.log('🔍 Verificando dados existentes no banco...\n');

  try {
    // Verificar áreas existentes
    console.log('📁 ÁREAS EXISTENTES:');
    console.log('==================');
    const areas = await prisma.area.findMany({
      include: {
        parent: true,
        subAreas: true
      },
      orderBy: [
        { parentId: 'asc' },
        { name: 'asc' }
      ]
    });

    if (areas.length === 0) {
      console.log('❌ Nenhuma área encontrada');
    } else {
      areas.forEach(area => {
        const parentInfo = area.parent ? ` (Pai: ${area.parent.name})` : ' (Área principal)';
        const subAreasCount = area.subAreas.length > 0 ? ` [${area.subAreas.length} subáreas]` : '';
        console.log(`ID: ${area.id} | Nome: ${area.name}${parentInfo}${subAreasCount}`);
        if (area.description) {
          console.log(`   Descrição: ${area.description}`);
        }
        console.log('');
      });
    }

    console.log('\n🛠️ SKILLS EXISTENTES:');
    console.log('====================');
    const skills = await prisma.skill.findMany({
      include: {
        area: true
      },
      orderBy: [
        { areaId: 'asc' },
        { name: 'asc' }
      ]
    });

    if (skills.length === 0) {
      console.log('❌ Nenhuma skill encontrada');
    } else {
      // Agrupar skills por área
      const skillsByArea = skills.reduce((acc, skill) => {
        const areaName = skill.area?.name || 'Sem área';
        if (!acc[areaName]) {
          acc[areaName] = [];
        }
        acc[areaName].push(skill);
        return acc;
      }, {} as Record<string, any[]>);

      Object.entries(skillsByArea).forEach(([areaName, areaSkills]) => {
        console.log(`\n📍 ${areaName}:`);
        areaSkills.forEach(skill => {
          console.log(`  ID: ${skill.id} | Nome: ${skill.name}`);
          if (skill.description) {
            console.log(`      Descrição: ${skill.description}`);
          }
        });
      });
    }

    console.log('\n📊 RESUMO:');
    console.log('==========');
    console.log(`Total de áreas: ${areas.length}`);
    console.log(`Total de skills: ${skills.length}`);
    
    const areasWithParent = areas.filter(a => a.parentId);
    const mainAreas = areas.filter(a => !a.parentId);
    console.log(`Áreas principais: ${mainAreas.length}`);
    console.log(`Subáreas: ${areasWithParent.length}`);

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkExistingData();
