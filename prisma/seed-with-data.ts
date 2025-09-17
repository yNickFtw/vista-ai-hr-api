import { PrismaClient } from '@prisma/client';
import { areas, skills, users, userSummaries } from './data';

const prisma = new PrismaClient();

const main = async () => {
  for (const skill of skills) {
    console.log('Creating skill:', skill);
    await prisma.skill.create({
      data: {
        id: skill.id,
        name: skill.name,
        description: skill.description,
        areaId: skill.areaId,
        createdAt: skill.createdAt,
        updatedAt: skill.updatedAt,
      },
    });
  }

  for (const area of areas) {
    console.log('Creating area:', area);
    await prisma.area.create({
      data: {
        id: area.id,
        name: area.name,
        description: area.description,
        parentId: area.parentId,
        createdAt: area.createdAt,
        updatedAt: area.updatedAt,
      },
    });
  }

  for (const user of users) {
    console.log('Creating user:', user);
    const userCreated = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        is_recruiter: user.is_recruiter,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    for (const experience of user.experiences) {
        await prisma.experience.create({
            data: {
                id: experience.id,
                title: experience.title,
                description: experience.description,
                startDate: experience.startDate,
                endDate: experience.endDate,
                userId: userCreated.id,
                createdAt: experience.createdAt,
                updatedAt: experience.updatedAt,
            }
        });
    }

    for (const skill of user.skills) {
      console.log('Creating user skill:', skill);
      await prisma.userSkill.create({
        data: {
          id: skill.id,
          userId: userCreated.id,
          skillId: skill.skillId,
          createdAt: skill.createdAt,
          updatedAt: skill.updatedAt,
        },
      });
    }

    for (const area of user.areas) {
      console.log('Creating user area:', area);
      await prisma.userArea.create({
        data: {
          id: area.id,
          userId: userCreated.id,
          areaId: area.areaId,
          createdAt: area.createdAt,
          updatedAt: area.updatedAt,
        },
      });
    }
  }

  for (const userSummary of userSummaries) {
    console.log('Creating user summary:', userSummary);
    await prisma.userSummary.create({
      data: {
        id: userSummary.id,
        userId: userSummary.userId,
        content: userSummary.content,
        createdAt: userSummary.createdAt,
        updatedAt: userSummary.updatedAt,
      },
    });
  }
};

main().then(() => {
    console.log('Data seeded successfully');
    process.exit(0);
});
