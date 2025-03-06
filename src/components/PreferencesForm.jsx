// PreferencesForm.jsx
import React from 'react';

function PreferencesForm({ preferences, onPreferenceChange, mealType, onMealTypeChange }) {
  const options = ['Vegan', 'Vegetarian', 'Non-Vegetarian', 'Gluten-free', 'Dairy-free', 'Nut-free'];
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <div className="preferences-form max-w-md mx-auto p-4 bg-lemon-chiffon rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-brown-800 mb-2">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            className={`px-2 py-1 rounded-full text-sm border border-dashed transition-colors duration-200 ${
              preferences.includes(option)
                ? 'border-green-800 bg-green-200 text-green-800'
                : 'border-blue-500 bg-white text-blue-500 hover:bg-blue-100'
            }`}
            onClick={() => onPreferenceChange(option, !preferences.includes(option))}
          >
            {option}
          </button>
        ))}
      </div>
      <div>
        <h3 className="text-xl font-bold text-brown-800 mt-4 mb-2">Meal Type</h3>
        <select
          value={mealType}
          onChange={(e) => onMealTypeChange(e.target.value)}
          className="p-2 bg-[#FFFACD] border border-black rounded-2xl"
        >
          <option value="">Select Meal Type</option>
          {mealTypes.map((type) => (
            <option className='bg-[#FFFACD]' key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PreferencesForm;