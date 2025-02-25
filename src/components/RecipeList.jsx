import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onSaveRecipe }) {
  return (
    <div>
      <h3>Recipe Suggestions</h3>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id} // Use _id instead of index
            recipe={recipe}
            showSaveButton={true}
            onSave={onSaveRecipe}
          />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;