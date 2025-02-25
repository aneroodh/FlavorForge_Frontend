function RecipeCard({ recipe, showSaveButton, showRemoveButton, onSave, onRemove }) 
{
    return (
      <div className="bg-[#F8E9A1]">
        <h4>{recipe.title}</h4>
        <p>{recipe.description}</p>
        <p>{recipe.ingredients}</p>
        <p>{recipe.instructions}</p>
        {showSaveButton && ( <button onClick={() => onSave(recipe)}>Save</button>)}
        {showRemoveButton && <button onClick={() => onRemove(recipe)}>Remove</button>}
      </div>
    );
}
  
  export default RecipeCard;