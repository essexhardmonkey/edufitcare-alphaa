/* @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import mysql from 'mysql2';

function FoodForm() {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a MySQL connection
    const connection = mysql.createConnection({
      host: 'localhost', // Your MySQL server host
      user: 'root', // Your MySQL username
      password: '', // Your MySQL password
      database: 'food_tracking', // Your database name
    });

    // Insert food data into the database
    connection.query(
      'INSERT INTO foods (name, calories, carbohydrates, protein) VALUES (?, ?, ?, ?)',
      [foodName, calories, carbohydrates, protein],
      (error, results) => {
        if (error) {
          console.error('Error inserting food:', error);
        } else {
          console.log('Food inserted successfully');
          // Clear form inputs after successful submission
          setFoodName('');
          setCalories('');
          setCarbohydrates('');
          setProtein('');
        }
        // Close the MySQL connection
        connection.end();
      }
    );
  };

  return (
    <div>
      <h2>Log Food</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="foodName">Food Name:</label>
          <input
            type="text"
            id="foodName"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="carbohydrates">Carbohydrates:</label>
          <input
            type="number"
            id="carbohydrates"
            value={carbohydrates}
            onChange={(e) => setCarbohydrates(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="protein">Protein:</label>
          <input
            type="number"
            id="protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log Food</button>
      </form>
    </div>
  );
}

export default FoodForm;
