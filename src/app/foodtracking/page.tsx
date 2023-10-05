"use client"

// pages/food-tracking.js
import { useState } from 'react';
import axios from 'axios';

const FoodTracking = () => {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [foodEntries, setFoodEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  const handleAddFood = async () => {
    try {
      const response = await axios.post('/api/foodEntries', {
        foodName,
        calories,
        carbohydrates,
        protein,
      });

      const newEntry = response.data;
      setFoodEntries([...foodEntries, newEntry]);
      setFoodName('');
      setCalories('');
      setCarbohydrates('');
      setProtein('');
    } catch (error) {
      console.error('Error adding food entry:', error);
    }
  };

  const fetchFoodEntries = async () => {
    try {
      const response = await axios.get('/api/foodEntries');
      const { foodEntries, totalCalories } = response.data;

      setFoodEntries(foodEntries);
      setTotalCalories(totalCalories);
    } catch (error) {
      console.error('Error fetching food entries:', error);
    }
  };

  return (
    <div>
      <h1>Food Tracking</h1>
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
        <p>{totalCalories} calories</p>
      </div>
      <button onClick={fetchFoodEntries}>Refresh</button>
    </div>
  );
};

export default FoodTracking;
