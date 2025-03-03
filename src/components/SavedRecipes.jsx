import RecipeCard from "./RecipeCard";

function SavedRecipes({ savedRecipes, onRemoveRecipe, onUpdateRecipe, getToken }) {
  return (
    <div className="saved-recipes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {savedRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          showRemoveButton={true}
          onRemove={onRemoveRecipe}
          showNutritionButton={true} // Show the button only in SavedRecipes
          onUpdate={onUpdateRecipe}  // Pass update callback
          getToken={getToken}        // Pass getToken for API authentication
        />
      ))}
    </div>
  );
}

export default SavedRecipes;