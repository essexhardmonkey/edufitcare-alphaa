"use client"
// pages/food-logger.js
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const prisma = new PrismaClient();

export default function FoodLogger() {
  const router = useRouter();
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');

  const handleAddFood = async () => {
    if (foodName && calories && carbohydrates && protein) {
      try {
        const newEntry = await prisma.foodEntry.create({
          data: {
            foodName,
            calories: parseInt(calories),
            carbohydrates: parseInt(carbohydrates),
            protein: parseInt(protein),
          },
        });

        setFoodName('');
        setCalories('');
        setCarbohydrates('');
        setProtein('');
      } catch (error) {
        console.error('Error adding food entry:', error);
      }
    } else {
      console.error('Please fill in all fields');
    }
  };

  const calculateTotalCalories = async () => {
    try {
      const foodEntries = await prisma.foodEntry.findMany();
      const totalCalories = foodEntries.reduce(
        (total, entry) => total + entry.calories,
        0
      );
      return totalCalories;
    } catch (error) {
      console.error('Error calculating total calories:', error);
      return 0;
    }
  };

  return (
    <div>
      <h1>Food Logger</h1>
      <div>
        <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Carbohydrates (g)"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
        />
        <input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <button onClick={handleAddFood}>Add Food</button>
      </div>
      <div>
        <h2>Food Entries</h2>
        <ul>
          {foodEntries.map((entry, index) => (
            <li key={index}>
              {entry.foodName} - {entry.calories} calories
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total Calories Today</h2>
        <p>{calculateTotalCalories()} calories</p>
      </div>
    </div>
  );
}
