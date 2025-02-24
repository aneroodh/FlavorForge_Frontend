function PreferencesForm({ preferences, onPreferenceChange }) {
    const options = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free'];
  
    return (
      <div className="bg-gray-400 p-8 rounded-lg shadow-lg text-center">
        <h3>Dietary Preferences</h3>
        {options.map((option) => (
          <label key={option}>
            <input
              type="checkbox"
              checked={preferences.includes(option)}
              onChange={(e) => onPreferenceChange(option, e.target.checked)}
            />
            {option}
          </label>
        ))}
      </div>
    );
  }
  
  export default PreferencesForm;