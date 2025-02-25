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
    <div className="max-w-md mx-auto p-4 bg-[#F8E9A1] rounded-lg shadow-lg">
      <h3 className="font-bold">Ingredients</h3>
      <input
        type="text"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        placeholder="Enter an ingredient"
        className="w-full p-2 border rounded"
      />
      <button
        className="mt-2 w-full bg-[#2A3132] text-white p-2 rounded hover:bg-black"
        onClick={handleAdd}>
        Add
      </button>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button 
              className="font-bold mx-2 w-6 h-6 text-red-700 rounded-md hover:text-white hover:bg-red-700 transition duration-300"
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