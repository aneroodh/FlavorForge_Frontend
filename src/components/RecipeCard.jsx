function RecipeCard({ recipe, showSaveButton, showRemoveButton, onSave, onRemove }) {
  return (
    <div className="recipe-card bg-white p-4 rounded-md shadow-md hover:scale-105 transition-transform">
      <h4 className="text-lg font-bold text-brown-800">{recipe.title}</h4>
      <p className="text-gray-700">👉 {recipe.description}</p>
      <p className="text-gray-700">👉 {recipe.ingredients}</p>
      <p className="text-gray-700">👉 {recipe.instructions}</p>
      <div className="mt-2 space-x-2">
        {showSaveButton && (
          <button className="save-button" onClick={() => onSave(recipe)}>
            Save
          </button>
        )}
        {showRemoveButton && (
          <button className="remove-button" onClick={() => onRemove(recipe)}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;