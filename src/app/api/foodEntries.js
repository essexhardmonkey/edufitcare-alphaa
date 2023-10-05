

// pages/api/foodEntries.js
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      const { foodName, calories, carbohydrates, protein } = req.body;

      const newEntry = await prisma.foodEntry.create({
        data: {
          foodName,
          calories,
          carbohydrates,
          protein,
        },
      });

      res.status(201).json(newEntry);
    } else if (req.method === 'GET') {
      const currentDate = new Date();
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      const foodEntries = await prisma.foodEntry.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
      });

      const totalCalories = foodEntries.reduce(
        (total, entry) => total + entry.calories,
        0
      );

      res.status(200).json({ foodEntries, totalCalories });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  } finally {
    await prisma.$disconnect();
  }
};
