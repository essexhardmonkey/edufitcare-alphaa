"use client"

// pages/index.js
import { useState } from 'react';
import { POST } from 'api/addfood';

export default function Home() {
  const [foodData, setFoodData] = useState({
    name: '',
    calories: 0,
    carbohydrates: 0,
    protein: 0,
    fats: 0,
  });

  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleFoodDataChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const addFood = async () => {
    try {
      console.log(JSON.stringify(foodData));
      const response = await fetch('/api/addfood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      if (response.status === 201) {
        const food = await response.json();
        setFoods([...foods, food]);
        calculateTotalCalories();
        setFoodData({
          name: '',
          calories: 0,
          carbohydrates: 0,
          protein: 0,
          fats: 0,
        });
      } else {
        console.error('Error adding food:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  const calculateTotalCalories = () => {
    const total = foods.reduce((sum, food) => sum + food.calories, 0);
    setTotalCalories(total);
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
      <h2>Food List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>
              <td>{food.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Calories: {totalCalories}</p>
    </div>
  );
}
