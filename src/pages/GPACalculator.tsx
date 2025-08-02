import React, { useState, useEffect } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import SubjectForm from '../components/SubjectForm';
import GPAResult from '../components/GPAResult';
import WhatIfTool from '../components/WhatIfTool';
import { Subject } from '../utils/gradeCalculations';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GPACalculator: React.FC = () => {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('gpa-subjects', []);
  const [showWhatIf, setShowWhatIf] = useState(false);

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all subjects?')) {
      setSubjects([]);
    }
  };

  const hasSubjects = subjects.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
              <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              GPA Calculator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Calculate your semester GPA by adding your subjects, credits, and grades. 
            Your data is automatically saved locally.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setShowWhatIf(!showWhatIf)}
            disabled={!hasSubjects}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasSubjects
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Save className="h-4 w-4" />
            <span>{showWhatIf ? 'Hide' : 'Show'} What-If Tool</span>
          </button>
          
          <button
            onClick={clearAll}
            disabled={!hasSubjects}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              hasSubjects
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <SubjectForm subjects={subjects} onSubjectsChange={setSubjects} />
            </div>
            
            {/* What-If Tool */}
            {showWhatIf && hasSubjects && (
              <WhatIfTool subjects={subjects} />
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {hasSubjects ? (
              <GPAResult subjects={subjects} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Start Adding Subjects
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add your subjects with credits and grades to see your GPA calculation and detailed breakdown.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Quick Tips
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
            <li>• Your data is automatically saved in your browser's local storage</li>
            <li>• Credits typically range from 1-4 for most VIT courses</li>
            <li>• Use the What-If tool to plan your target grades for remaining subjects</li>
            <li>• A GPA of 8.5+ is considered excellent for placements and higher studies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;