import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onSaveRecipe }) {
  return (
    <div className="bg-gray-500 p-8 rounded-lg shadow-lg text-center">
      <h3>Recipe Suggestions</h3>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
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