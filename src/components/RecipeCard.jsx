function RecipeCard({ recipe, showSaveButton, showRemoveButton, onSave, onRemove }) 
{
    return (
      <div className="recipe-card">
        <img src={recipe.image} alt={recipe.title} />
        <h4>{recipe.title}</h4>
        <p>{recipe.description}</p>
        {showSaveButton && ( <button onClick={() => onSave(recipe)}>Save</button>)}
        {showRemoveButton && <button onClick={() => onRemove(recipe)}>Remove</button>}
      </div>
    );
}
  
  export default RecipeCard;