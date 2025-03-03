import React from 'react';

function NutritionalInfo({ nutrition }) {
  if (!nutrition || !Object.keys(nutrition).length) {
    return <p className="text-gray-500">Nutritional information unavailable</p>;
  }

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold">Nutritional Information (per serving)</h3>
      <ul className="list-disc list-inside mt-2">
        <li>Calories: {nutrition.calories?.toFixed(1) || 0} kcal</li>
        <li>Protein: {nutrition.protein?.toFixed(1) || 0} g</li>
        <li>Carbohydrates: {nutrition.carbs?.toFixed(1) || 0} g</li>
        <li>Fats: {nutrition.fats?.toFixed(1) || 0} g</li>
      </ul>
      <p className="text-sm text-gray-600 mt-2">*Values are estimates and may vary.</p>
    </div>
  );
}

export default NutritionalInfo;