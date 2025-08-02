import React from 'react';
import { Download } from 'lucide-react';
import { Subject, calculateGPA, getPerformanceLevel, gradePoints } from '../utils/gradeCalculations';
import { generateGPAReport } from '../utils/pdfGenerator';

interface GPAResultProps {
  subjects: Subject[];
}

const GPAResult: React.FC<GPAResultProps> = ({ subjects }) => {
  const gpa = calculateGPA(subjects);
  const performance = getPerformanceLevel(gpa);
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  const downloadReport = async () => {
    await generateGPAReport(subjects, 'gpa-result');
  };

  if (subjects.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* GPA Display */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Your GPA</h3>
          <div className="text-5xl font-bold mb-2">{gpa.toFixed(2)}</div>
          <div className="text-blue-100">
            <span className="font-medium">{performance.level}</span>
            <br />
            <span className="text-sm">{performance.description}</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">{subjects.length}</div>
            <div className="text-blue-100 text-sm">Subjects</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">{totalCredits}</div>
            <div className="text-blue-100 text-sm">Total Credits</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <button
              onClick={downloadReport}
              className="flex items-center justify-center space-x-1 text-white hover:text-blue-200 transition-colors w-full"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm">PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Subject Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Subject</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Credits</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Grade</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Points</th>
                <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Total</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const points = gradePoints[subject.grade];
                const total = subject.credits * points;
                return (
                  <tr key={subject.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 px-3 text-gray-900 dark:text-white">
                      {subject.name || `Subject ${index + 1}`}
                    </td>
                    <td className="py-2 px-3 text-center text-gray-700 dark:text-gray-300">{subject.credits}</td>
                    <td className="py-2 px-3 text-center">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-semibold ${
                        points === 10 ? 'bg-emerald-500' :
                        points === 9 ? 'bg-green-500' :
                        points === 8 ? 'bg-blue-500' :
                        points === 7 ? 'bg-yellow-500' :
                        points === 6 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}>
                        {subject.grade}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center text-gray-700 dark:text-gray-300">{points}</td>
                    <td className="py-2 px-3 text-center font-medium text-gray-900 dark:text-white">{total}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-semibold">
                <td className="py-2 px-3 text-gray-900 dark:text-white">Total</td>
                <td className="py-2 px-3 text-center text-gray-900 dark:text-white">{totalCredits}</td>
                <td className="py-2 px-3"></td>
                <td className="py-2 px-3"></td>
                <td className="py-2 px-3 text-center text-gray-900 dark:text-white">
                  {subjects.reduce((sum, subject) => sum + (subject.credits * gradePoints[subject.grade]), 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GPAResult;