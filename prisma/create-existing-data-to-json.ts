import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';

const prisma = new PrismaClient();

const main = async () => {
    const areas = await prisma.area.findMany();

    const skills = await prisma.skill.findMany();

    const users = await prisma.user.findMany();

    const experiences = await prisma.experience.findMany();

    const userSkills = await prisma.userSkill.findMany();

    const userAreas = await prisma.userArea.findMany();

    const userSummaries = await prisma.userSummary.findMany();

    // area
    fs.writeFileSync('areas.json', JSON.stringify(areas, null, 2));
    // skills
    fs.writeFileSync('skills.json', JSON.stringify(skills, null, 2));
    // users

    const usersWithTables = users.map((user) => {
        return {
            ...user,
            skills: userSkills.filter((skill) => skill.userId === user.id),
            areas: userAreas.filter((area) => area.userId === user.id),
            experiences: experiences.filter((experience) => experience.userId === user.id),
        }
    })

    fs.writeFileSync('users.json', JSON.stringify(usersWithTables, null, 2));
    // user summaries
    fs.writeFileSync('user-summaries.json', JSON.stringify(userSummaries, null, 2));
}

main();
