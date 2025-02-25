import RecipeCard from "./RecipeCard";

function SavedRecipes({ savedRecipes, onRemoveRecipe }) {
  return (
    <div>
      <h3>Saved Recipes</h3>
      <div className="saved-recipes">
        {savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe._id} // Use MongoDB's _id as the unique key
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