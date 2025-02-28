function PreferencesForm({ preferences, onPreferenceChange }) {
  const options = ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Nut-free'];

  return (
    <div className="preferences-form max-w-md mx-auto p-4 bg-lemon-chiffon rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-brown-800 mb-2">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={preferences.includes(option)}
              onChange={(e) => onPreferenceChange(option, e.target.checked)}
              className="form-checkbox text-green-600"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PreferencesForm;