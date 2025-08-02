import React from 'react';
import { gradePoints } from '../utils/gradeCalculations';

const GradingSystemTable: React.FC = () => {
  const grades = Object.entries(gradePoints);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
          📊
        </span>
        VIT Grading System
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-600">
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Grade</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Points</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Description</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(([grade, points], index) => (
              <tr
                key={grade}
                className={`border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold ${
                    points === 10 ? 'bg-emerald-500' :
                    points === 9 ? 'bg-green-500' :
                    points === 8 ? 'bg-blue-500' :
                    points === 7 ? 'bg-yellow-500' :
                    points === 6 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}>
                    {grade}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{points}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                  {points === 10 ? 'Outstanding' :
                   points === 9 ? 'Excellent' :
                   points === 8 ? 'Very Good' :
                   points === 7 ? 'Good' :
                   points === 6 ? 'Satisfactory' :
                   points === 5 ? 'Sufficient' :
                   'Fail'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradingSystemTable;