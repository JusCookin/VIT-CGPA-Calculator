import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Subject, calculateRequiredGrades } from '../utils/gradeCalculations';

interface WhatIfToolProps {
  subjects: Subject[];
}

const WhatIfTool: React.FC<WhatIfToolProps> = ({ subjects }) => {
  const [targetGPA, setTargetGPA] = useState(8.5);
  const [remainingCredits, setRemainingCredits] = useState(12);

  const analysis = calculateRequiredGrades(subjects, targetGPA, remainingCredits);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
          <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">"What-If" Scenario Planner</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Target GPA
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={targetGPA}
            onChange={(e) => setTargetGPA(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Remaining Credits
          </label>
          <input
            type="number"
            min="0"
            value={remainingCredits}
            onChange={(e) => setRemainingCredits(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className={`p-4 rounded-lg ${
        analysis.achievable 
          ? 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800' 
          : 'bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800'
      }`}>
        <h4 className={`font-semibold mb-2 ${
          analysis.achievable 
            ? 'text-green-800 dark:text-green-200' 
            : 'text-red-800 dark:text-red-200'
        }`}>
          {analysis.achievable ? '✅ Target Achievable' : '❌ Target Not Achievable'}
        </h4>
        
        <div className="space-y-2 text-sm">
          <p className={analysis.achievable ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
            <strong>Required Average for Remaining Subjects:</strong> {analysis.requiredPoints.toFixed(2)} points
          </p>
          <p className={analysis.achievable ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>
            <strong>Recommendation:</strong> {analysis.suggestedGrades}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatIfTool;