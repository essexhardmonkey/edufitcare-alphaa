// pages/api/addFood.js
import prisma from '@/../prisma/client';

export async function POST(req, res) {
  const { name, calories, carbohydrates, protein, fats } = req.body;

  try {
    const food = await prisma.food.create({
      data: {
        name,
        calories,
        carbohydrates,
        protein,
        fats,
      },
    });
    res.status(201).json(food);
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ error: 'Unable to add food' });
  }
}
