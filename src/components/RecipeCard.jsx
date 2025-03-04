import React, { useState } from 'react';
import axios from 'axios';
import NutritionalInfo from './NutritionalInfo';

function RecipeCard({ recipe, showSaveButton, showRemoveButton, showNutritionButton, onSave, onRemove, onUpdate, getToken }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleGetNutrition = async (recipeId) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await axios.get(`http://localhost:5000/get-nutrition/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(response.data.recipe);
    } catch (err) {
      console.error('Error fetching nutritional info:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="recipe-card bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform">
      <h4 className="text-lg font-bold text-brown-800">{recipe.title}</h4>
      <p className="text-gray-700">👉 {recipe.description}</p>
      {recipe === undefined ? <p>Recipe loading</p>:recipe.ingredients.map((ingredient,i) => (
        <p className="text-gray-700">{i+1}. {ingredient}</p>
      ))}
      <p className="text-gray-700">👉 {recipe.instructions}</p>
      <div className="mt-2 space-x-2">
        {showSaveButton && (
          <button className="save-button" onClick={() => onSave(recipe)}>
            Save
          </button>
        )}
        {recipe.nutrition && Object.keys(recipe.nutrition).length > 0 && (
          <NutritionalInfo nutrition={recipe.nutrition} />
        )}
        {showRemoveButton && (
          <button className="remove-button" onClick={() => onRemove(recipe)}>
            Remove
          </button>
        )}
        {showNutritionButton && !recipe.nutrition && (
          <button
            className="nutrition-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => handleGetNutrition(recipe._id)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Get Nutritional Info'}
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;