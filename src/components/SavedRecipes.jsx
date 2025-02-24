import RecipeCard from './RecipeCard';

function SavedRecipes({ savedRecipes, onRemoveRecipe }) {
  return (
    <div className="bg-gray-600 p-8 rounded-lg shadow-lg text-center">
      <h3>Saved Recipes</h3>
      <div className="saved-recipes">
        {savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            showRemoveButton={true}
            onRemove={onRemoveRecipe}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedRecipes;