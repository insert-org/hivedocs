import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  const password = faker.internet.password()
  const saltRounds = 10
  const salt = genSaltSync(saltRounds)
  const hashedPassword = hashSync(password, salt)

  try {
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@hivedocs.com",
        password: hashedPassword,
      }
    })

    console.log(`Admin created with password: ${password}`)
  } catch (e) { console.error(e) }

  const articles = await prisma.article.findMany()

  if (!articles.length) {
    try {
      for (let i = 0; i < 10; i++) {
        const author = await prisma.author.create({
          data: {
            name: faker.person.fullName(),
            image: faker.image.url(),
            approved: true,
            resume: faker.lorem.paragraph(),
          }
        })

        for (let j = 0; j < 5; j++) {
          await prisma.article.create({
            data: {
              title: faker.lorem.sentence(),
              resume: faker.lorem.paragraph(),
              year: faker.date.past().getFullYear(),
              approved: true,
              image: faker.image.url(),
              authorId: author.id,
              views: faker.number.int({ min: 0, max: 1000 }),
            }
          })
        }
      }
    } catch (e) { console.error(e) }

    try {
      for (let k = 0; k < 5; k++) {
        const user = await prisma.user.create({
          data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            image: faker.image.url(),
          }
        })

        const articles = await prisma.article.findMany()

        for (let article of articles) {
          await prisma.review.create({
            data: {
              content: faker.lorem.paragraph(),
              rating: faker.number.float({ min: 0.5, max: 5, multipleOf: 0.5 }),
              userId: user.id,
              articleId: article.id,
            }
          })
        }
      }
    } catch (e) { console.error(e) }
  } else {
    console.log('Articles already seeded')
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })