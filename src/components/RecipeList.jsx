import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onSaveRecipe, savedRecipes }) {
  return (
    <div className="recipe-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          showSaveButton={true}
          onSave={onSaveRecipe}
          showNutritionButton={false}
          isSaved={savedRecipes.some((saved) => saved._id === recipe._id)}
        />
      ))}
    </div>
  );
}

export default RecipeList;