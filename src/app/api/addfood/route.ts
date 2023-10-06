// // // pages/api/addFood.js
// import type { NextApiRequest, NextApiResponse } from 'next'
 
// type ResponseData = {
//   message: string
// }
 
// export async function POST(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
// }
// // import prisma from '@/../prisma/client';
// // import type { NextApiRequest, NextApiResponse } from 'next'

// // export async function POST(req, res:NextApiResponse) {
// //   console.log(req.body);
// //   const { name, calories, carbohydrates, protein, fats } = req.body.data;
// //   try {
// //     const food = await prisma.food.create({
// //       data: {
// //         name,
// //         calories,
// //         carbohydrates,
// //         protein,
// //         fats,
// //       },
// //     });
// //     res.status(201).json(food);
// //   } catch (error) {
// //     console.error('Error adding food:', error);
// //     res.status(500).json({ error: 'Unable to add food' });
// //   }
// // }
