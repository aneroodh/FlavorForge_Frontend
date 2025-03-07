// SavedRecipes.jsx
import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import EditRecipeModal from './EditRecipeModal';
import axios from 'axios';

function SavedRecipes({ savedRecipes, setSavedRecipes, onRemoveRecipe, onUpdateRecipe, getToken }) {
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFavourites, setShowFavourites] = useState(false);

  const handleEdit = (recipe) => setEditingRecipe(recipe);

  const handleUpdate = (updatedRecipe) => {
    setSavedRecipes(savedRecipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
    setEditingRecipe(null);
  };

  const toggleFavourite = async (recipe) => {
    try {
      const token = await getToken();
      const updatedFavourite = !recipe.favourite;
  
      // Send only the favourite field in the PUT request
      await axios.put(
        `https://flavor-forge-backend.vercel.app/update-recipe/${recipe._id}`,
        { favourite: updatedFavourite },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // Update the local state to reflect the change
      setSavedRecipes(savedRecipes.map(r =>
        r._id === recipe._id ? { ...r, favourite: updatedFavourite } : r
      ));
    } catch (error) {
      console.error('Error toggling favourite:', error);
    }
  };

  // Filter recipes based on selected tags and favourite status
  const filteredRecipes = savedRecipes.filter(recipe => {
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => recipe.tags?.includes(tag));
    const matchesFavourite = !showFavourites || recipe.favourite;
    return matchesTags && matchesFavourite;
  });

  // Define available tags
  const tags = ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Gluten-free', 'Dairy-free', 'Nut-free', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <div className="saved-recipes">
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <span className="text-brown-800 font-bold text-base">Filter by Tags:</span>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  className={`px-2 py-1 rounded-full text-sm border border-dashed transition-colors duration-200 ${
                    selectedTags.includes(tag)
                      ? 'border-green-800 bg-green-200 text-green-800'
                      : 'border-blue-500 bg-white text-blue-500 hover:bg-blue-100'
                  }`}
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                    );
                  }}
                >
                  {tag}
                </button>
              ))}
        </div>
    </div>
    <label className="mx-2 flex items-center space-x-2">
      <input
        type="checkbox"
        checked={showFavourites}
        onChange={(e) => setShowFavourites(e.target.checked)}
        className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-green-500"
      />
      <span className="text-gray-700 font-semibold text-sm">Show Favourites Only</span>
    </label>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onEdit={handleEdit}
            onRemove={onRemoveRecipe}
            inSavedRecipe={true}
            onUpdate={onUpdateRecipe}
            getToken={getToken}
            onToggleFavourite={() => toggleFavourite(recipe)}
            isFavourite={recipe.favourite}
          />
        ))}
      </div>
      {editingRecipe && (
        <EditRecipeModal
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onUpdate={handleUpdate}
          getToken={getToken}
        />
      )}
    </div>
  );
}

export default SavedRecipes;