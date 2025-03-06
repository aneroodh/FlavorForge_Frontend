import React, { useState } from 'react';
import axios from 'axios';

function EditRecipeModal({ recipe, onClose, onUpdate, getToken }) {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [ingredientsText, setIngredientsText] = useState(recipe.ingredients.join('\n'));
  const [instructions, setInstructions] = useState(recipe.instructions);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ingredientsArray = ingredientsText.split('\n').map(item => item.trim()).filter(item => item);
      const token = await getToken();
      const response = await axios.put(
        `http://localhost:5000/update-recipe/${recipe._id}`,
        { title, description, ingredients: ingredientsArray, instructions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onUpdate(response.data.recipe);
      onClose();
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* Modal Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto z-[1001]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-brown-800">Edit Recipe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <label className="block">
            <span className="text-brown-800 font-semibold">Title:</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full p-2 border border-goldenrod rounded"
            />
          </label>
          {/* Description Field */}
          <label className="block">
            <span className="text-brown-800 font-semibold">Description:</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full p-2 border border-goldenrod rounded"
              rows="4"
            />
          </label>
          {/* Ingredients Field */}
          <label className="block">
            <span className="text-brown-800 font-semibold">Ingredients:</span>
            <p className="text-sm text-gray-600 mb-1">Enter one ingredient per line.</p>
            <textarea
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              className="mt-1 w-full p-2 border border-goldenrod rounded"
              rows="6"
            />
          </label>
          {/* Instructions Field */}
          <label className="block">
            <span className="text-brown-800 font-semibold">Instructions:</span>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mt-1 w-full p-2 border border-goldenrod rounded"
              rows="8"
            />
          </label>
          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRecipeModal;