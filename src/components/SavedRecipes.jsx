import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import EditRecipeModal from './EditRecipeModal';

function SavedRecipes({ savedRecipes, setSavedRecipes, onRemoveRecipe, onUpdateRecipe, getToken }) {
  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleEdit = (recipe) => setEditingRecipe(recipe);

  const handleUpdate = (updatedRecipe) => {
    setSavedRecipes(savedRecipes.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
    setEditingRecipe(null);
  };

  return (
    <div className="saved-recipes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {savedRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onEdit={handleEdit}
          onRemove={onRemoveRecipe}
          inSavedRecipe={true} // Show the button only in SavedRecipes
          onUpdate={onUpdateRecipe}  // Pass update callback
          getToken={getToken}        // Pass getToken for API authentication
        />
      ))}
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