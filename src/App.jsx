import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import './styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientInput from './components/IngredientInput.jsx';
import PreferencesForm from './components/PreferencesForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import SavedRecipes from './components/SavedRecipes.jsx';

function App() {
  const { userId, getToken } = useAuth(); // Use useAuth instead of useUser
  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addIngredient = (ingredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePreferenceChange = (option, checked) => {
    if (checked) {
      setPreferences((prev) => [...prev, option]);
    } else {
      setPreferences((prev) => prev.filter((p) => p !== option));
    }
  };

  // Fetch saved recipes when the user signs in
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/saved-recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedRecipes(response.data.recipes); // Sets savedRecipes with _id
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setError('Failed to load saved recipes.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchSavedRecipes();
  }, [userId, getToken]);

  // Save recipe to MongoDB
  const saveRecipe = async (recipe) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        'http://localhost:5000/save-recipe',
        recipe,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedRecipes((prev) => [...prev, response.data.recipe]);
    } catch (err) {
      console.error('Error saving recipe:', err);
      setError('Failed to save recipe.');
    }
  };

  const removeRecipe = async (recipe) => {
    try {
      const token = await getToken();
      await axios.delete(`http://localhost:5000/saved-recipes/${recipe._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedRecipes((prev) => prev.filter((r) => r._id !== recipe._id));
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setError("Failed to delete recipe.");
    }
  };

  const handleGenerateRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/generate-recipes', {
        ingredients,
        preferences,
      });
      const recipesWithIds = response.data.recipes.map((recipe, index) => ({
        ...recipe,
        _id: `temp-${index}-${Date.now()}`, // Temporary unique ID
      }));
      setRecipes(recipesWithIds);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <header>
      <SignedOut>
        <div className="min-h-screen flex flex-col items-center justify-center login-background">
          <div className="bg-gray-400 p-8 rounded-lg shadow-lg text-center">
            <div className="flex justify-center pt-3 pb-5">
              {/* <img src={Logo} alt="FlavorForge logo" /> */}
            </div>
            <h1 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to FlavorForge</h1>
            <p className="text-gray-500 mb-6">Sign in to get a personalized experience.</p>
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="bg-[#ECECEC]">
          <UserButton />
          <div>
            <IngredientInput
              ingredients={ingredients}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
            />
            <PreferencesForm
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
            />
            <div className="mt-4">
              <button
                onClick={handleGenerateRecipes}
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-600 transition disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : 'Generate Recipes'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <RecipeList recipes={recipes} onSaveRecipe={saveRecipe} />
            <SavedRecipes savedRecipes={savedRecipes} onRemoveRecipe={removeRecipe} />
          </div>
        </div>
      </SignedIn>
    </header>
  );
}

export default App;