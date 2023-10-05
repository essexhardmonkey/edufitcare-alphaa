// pages/food-logger.js
import { useEffect, useState } from 'react';

const FoodLogger = () => {
  const [foodEntries, setFoodEntries] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');

  useEffect(() => {
    // Fetch food entries from the API and update state
    async function fetchFoodEntries() {
      const response = await fetch('/api/food');
      const data = await response.json();
      setFoodEntries(data);
    }

    fetchFoodEntries();
  }, []);

  const handleAddFood = async () => {
    if (foodName && calories && carbohydrates && protein) {
      const response = await fetch('/api/food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName, calories, carbohydrates, protein }),
      });

      if (response.ok) {
        const newFoodEntry = await response.json();
        setFoodEntries([...foodEntries, newFoodEntry]);
        setFoodName('');
        setCalories('');
        setCarbohydrates('');
        setProtein('');
      }
    }
  };

  const calculateTotalCalories = () => {
    return foodEntries.reduce((total, entry) => total + entry.calories, 0);
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
          {foodEntries.map((entry) => (
            <li key={entry.id}>
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
};

export default FoodLogger;
