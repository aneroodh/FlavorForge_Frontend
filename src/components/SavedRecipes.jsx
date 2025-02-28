import RecipeCard from "./RecipeCard";

function SavedRecipes({ savedRecipes, onRemoveRecipe }) {
  return (
    <div className="saved-recipes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {savedRecipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          showRemoveButton={true}
          onRemove={onRemoveRecipe}
        />
      ))}
    </div>
  );
}

export default SavedRecipes;