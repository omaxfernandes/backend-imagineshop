import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main () {
  await prisma.product.deleteMany()

  const products = [
    {
      name: "Produto 1",
      description: "Descrição do Produto 1",
      details: "Detalhes do Produto 1",
      image: "image1.png",
      price: "10.00"
    },
    {
      name: "Produto 2",
      description: "Descrição do Produto 2",
      details: "Detalhes do Produto 2",
      image: "image2.png",
      price: "20.00"
    },
    {
      name: "Produto 3",
      description: "Descrição do Produto 3",
      details: "Detalhes do Produto 3",
      image: "image3.png",
      price: "30.00"
    },
    {
      name: "Produto 4",
      description: "Descrição do Produto 4",
      details: "Detalhes do Produto 4",
      image: "image4.png",
      price: "40.00"
    },
    {
      name: "Produto 5",
      description: "Descrição do Produto 5",
      details: "Detalhes do Produto 5",
      image: "image5.png",
      price: "50.00"
    },
    {
      name: "Produto 6",
      description: "Descrição do Produto 6",
      details: "Detalhes do Produto 6",
      image: "image6.png",
      price: "60.00"
    },
    {
      name: "Produto 7",
      description: "Descrição do Produto 7",
      details: "Detalhes do Produto 7",
      image: "image7.png",
      price: "70.00"
    },
    {
      name: "Produto 8",
      description: "Descrição do Produto 8",
      details: "Detalhes do Produto 8",
      image: "image8.png",
      price: "80.00"
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed completo!')
}

main()
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())