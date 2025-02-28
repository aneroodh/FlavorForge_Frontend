import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import './styles.css';
import IngredientInput from './components/IngredientInput.jsx';
import PreferencesForm from './components/PreferencesForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import SavedRecipes from './components/SavedRecipes.jsx';

function App() {
  const { userId, getToken } = useAuth();
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

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const token = await getToken();
        const response = await axios.get('http://localhost:5000/saved-recipes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedRecipes(response.data.recipes);
      } catch (err) {
        console.error('Error fetching saved recipes:', err);
        setError('Failed to load saved recipes.');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedRecipes();
  }, [userId, getToken]);

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
        _id: `temp-${index}-${Date.now()}`,
      }));
      setRecipes(recipesWithIds);
    } catch (err) {
      console.error('Error generating recipes:', err);
      setError('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Home = () => (
    <div className="flex flex-col items-center space-y-6">
      <IngredientInput
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
      />
      <PreferencesForm
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
      <button
        onClick={handleGenerateRecipes}
        disabled={loading}
        className="generate-button"
      >
        {loading ? 'Generating...' : 'Generate Recipes'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <RecipeList recipes={recipes} onSaveRecipe={saveRecipe} />
    </div>
  );

  const Recipes = () => (
    <div className="flex flex-col items-center">
      <SavedRecipes savedRecipes={savedRecipes} onRemoveRecipe={removeRecipe} />
    </div>
  );

  return (
    <Router>
      <header>
        <SignedOut>
          <div className="min-h-screen flex items-center justify-center login-background">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h1 className="text-3xl font-bold text-brown-800 mb-2">Welcome to FlavorForge</h1>
              <p className="text-gray-600 mb-6">Sign in to explore delicious recipes tailored to you.</p>
              <SignInButton mode="modal">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-orange-600 transition">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="min-h-screen flex flex-col animated-background">
            <nav className="bg-brown-800 p-4 flex justify-between items-center">
              <div className="text-white text-xl font-bold">FlavorForge</div>
              <div className="space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-300"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-300"
                  }
                >
                  Recipes
                </NavLink>
              </div>
              <UserButton />
            </nav>
            <div className="flex-grow flex justify-center items-center main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
              </Routes>
            </div>
          </div>
        </SignedIn>
      </header>
    </Router>
  );
}

export default App;