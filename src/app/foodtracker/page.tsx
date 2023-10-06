"use client"

// pages/index.js
import { PrismaClient } from '@prisma/client';
import { useState } from 'react';

const prisma = new PrismaClient();

export default function Home() {
  const [foodData, setFoodData] = useState({
    name: '',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fats: 0,
  });

  const handleFoodDataChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const addFood = async () => {
    try {
      await prisma.food.create({
        data: foodData,
      });
      setFoodData({
        name: '',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fats: 0,
      });
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <h1>Food Logger</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={foodData.name}
          onChange={handleFoodDataChange}
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={foodData.calories}
          onChange={handleFoodDataChange}
        />
        <input
          type="number"
          name="carbohydrates"
          placeholder="Carbohydrates"
          value={foodData.carbohydrates}
          onChange={handleFoodDataChange}
        />
        <input
          type="number"
          name="protein"
          placeholder="Protein"
          value={foodData.protein}
          onChange={handleFoodDataChange}
        />
        <input
          type="number"
          name="fats"
          placeholder="Fats"
          value={foodData.fats}
          onChange={handleFoodDataChange}
        />
        <button onClick={addFood}>Add Food</button>
      </div>
    </div>
  );
}
