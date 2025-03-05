import React, { useState } from 'react';
import axios from 'axios';
import NutritionalInfo from './NutritionalInfo';

function RecipeCard({
  recipe,
  showSaveButton,
  showRemoveButton,
  showNutritionButton,
  onSave,
  onRemove,
  onUpdate,
  getToken,
  isSaved = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleBackdropClick = () => {
    setIsExpanded(false);
  };

  const handleGetNutrition = async (recipeId) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await axios.get(`http://localhost:5000/get-nutrition/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdate(response.data.recipe);
    } catch (err) {
      console.error('Error fetching nutritional info:', err);
      setError('Failed to fetch nutritional info. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <>
      {isExpanded && (
        <div
          className="backdrop fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />
      )}
      <div
        className={`recipe-card bg-white p-4 rounded-md shadow-md cursor-pointer ${
          isExpanded ? 'expanded' : 'minimized'
        }`}
        onClick={handleToggleExpand}
      >
        <h4 className="text-lg font-bold text-brown-800">{recipe.title}</h4>
        <p className="text-gray-700">{recipe.description}</p>
        {!isExpanded && (
          <p className="text-gray-500 mt-2">Click to expand</p>
        )}
        {isExpanded && (
          <div className="full-content mt-4">
            <div className="ingredients">
              <h5 className="text-md font-semibold text-brown-800">Ingredients</h5>
              {recipe.ingredients?.length > 0 ? (
                recipe.ingredients.map((ingredient, i) => (
                  <p className="text-gray-700" key={i}>
                    {i + 1}. {ingredient}
                  </p>
                ))
              ) : (
                <p className="text-gray-700">No ingredients available</p>
              )}
            </div>
            <div className="instructions mt-4">
              <h5 className="text-md font-semibold text-brown-800">Instructions</h5>
              <p className="text-gray-700">{recipe.instructions || 'No instructions available'}</p>
            </div>
            {recipe.nutrition && Object.keys(recipe.nutrition).length > 0 && (
              <NutritionalInfo nutrition={recipe.nutrition} />
            )}
            <div className="buttons mt-4 space-x-2">
              {showSaveButton && !isSaved && (
                <button
                  className="save-button bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave(recipe);
                  }}
                >
                  Save
                </button>
              )}
              {showSaveButton && isSaved && (
                <span className="text-green-600 font-semibold">Saved</span>
              )}
              {showRemoveButton && (
                <button
                  className="remove-button bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(recipe);
                  }}
                >
                  Remove
                </button>
              )}
              {showNutritionButton && !recipe.nutrition && (
                <button
                  className="my-2 nutrition-button bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetNutrition(recipe._id);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Get Nutritional Info'}
                </button>
              )}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default RecipeCard;