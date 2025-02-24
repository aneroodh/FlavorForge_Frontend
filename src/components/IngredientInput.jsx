import React, { useState } from 'react';

function IngredientInput({ ingredients, addIngredient, removeIngredient }) {
  const [currentInput, setCurrentInput] = useState('');

  const handleAdd = () => {
    if (currentInput.trim() !== '') {
      addIngredient(currentInput.trim());
      setCurrentInput('');
    }
  };

  return (
    <div className="bg-gray-300 p-8 rounded-lg shadow-lg text-center">
      <h3>Ingredients</h3>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter an ingredient"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => removeIngredient(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientInput;