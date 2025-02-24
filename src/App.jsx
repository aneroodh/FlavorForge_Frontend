import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import './styles.css'
import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput.jsx';
import PreferencesForm from './components/PreferencesForm.jsx';
import RecipeList from './components/RecipeList.jsx';
import SavedRecipes from './components/SavedRecipes.jsx';
function App() {

  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [recipes, setRecipes] = useState([]); // Assume fetched based on ingredients and preferences
  const [savedRecipes, setSavedRecipes] = useState([]);

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

  const saveRecipe = (recipe) => {
    setSavedRecipes((prev) => [...prev, recipe]);
  };

  const removeRecipe = (recipe) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== recipe.id));
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
            <p className="text-gray-500 mb-6">Sign in to get persnalised experience.</p>
            
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
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
          <RecipeList recipes={recipes} onSaveRecipe={saveRecipe} />
          <SavedRecipes savedRecipes={savedRecipes} onRemoveRecipe={removeRecipe} />
        </div>
      </SignedIn>
    </header>
  )
}

export default App