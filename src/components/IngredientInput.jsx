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
    <div className="ingredient-input max-w-md mx-auto p-4 bg-yellow-100 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-brown-800 py-2">Ingredients</h3>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter an ingredient"
        className="w-full p-2 border border-goldenrod rounded"
      />
      <button
        className="mt-2 w-full bg-dark text-white p-2 rounded hover:bg-black transition"
        onClick={handleAdd}
      >
        Add
      </button>
      <ul className="mt-2">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex justify-between items-center py-1">
            {ingredient}
            <button
              className="text-red-700 hover:text-white hover:bg-red-700 w-6 h-6 rounded transition"
              onClick={() => removeIngredient(index)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientInput;