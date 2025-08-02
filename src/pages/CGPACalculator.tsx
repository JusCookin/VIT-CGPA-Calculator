import React, { useState } from 'react';
import { BarChart3, Plus, X, TrendingUp, Calculator, BookOpen, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Semester, calculateCGPA, getPerformanceLevel } from '../utils/gradeCalculations';
import { generateCGPAReport } from '../utils/pdfGenerator';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CGPACalculator: React.FC = () => {
  const [mode, setMode] = useState<'quick' | 'detailed'>('quick');
  const [semesters, setSemesters] = useLocalStorage<Semester[]>('cgpa-semesters', []);
  
  // Quick mode states
  const [currentCGPA, setCurrentCGPA] = useState(8.0);
  const [completedCredits, setCompletedCredits] = useState(120);
  const [currentSemesterGPA, setCurrentSemesterGPA] = useState(8.5);
  const [currentSemesterCredits, setCurrentSemesterCredits] = useState(20);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      gpa: 8.0,
      totalCredits: 20,
      subjects: []
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    setSemesters(semesters.filter(sem => sem.id !== id));
  };

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map(sem => 
      sem.id === id ? { ...sem, [field]: value } : sem
    ));
  };

  const calculateQuickCGPA = () => {
    const totalCurrentPoints = currentCGPA * completedCredits;
    const currentSemesterPoints = currentSemesterGPA * currentSemesterCredits;
    const totalCredits = completedCredits + currentSemesterCredits;
    return totalCredits > 0 ? (totalCurrentPoints + currentSemesterPoints) / totalCredits : 0;
  };

  const detailedCGPA = calculateCGPA(semesters);
  const quickCGPA = calculateQuickCGPA();
  const displayCGPA = mode === 'quick' ? quickCGPA : detailedCGPA;
  const performance = getPerformanceLevel(displayCGPA);

  const downloadReport = async () => {
    if (mode === 'detailed') {
      await generateCGPAReport(semesters, 'detailed');
    } else {
      const quickData = {
        cgpa: quickCGPA,
        currentCGPA,
        currentSemesterGPA,
        totalCredits: completedCredits + currentSemesterCredits
      };
      await generateCGPAReport([], 'quick', quickData);
    }
  };

  // Prepare chart data
  const chartData = mode === 'detailed' 
    ? semesters.map((sem, index) => ({
        semester: sem.name,
        gpa: sem.gpa,
        cumulative: calculateCGPA(semesters.slice(0, index + 1))
      }))
    : [
        { semester: 'Previous', gpa: currentCGPA, cumulative: currentCGPA },
        { semester: 'Current', gpa: currentSemesterGPA, cumulative: quickCGPA }
      ];

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all semester data?')) {
      setSemesters([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
              <BarChart3 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              CGPA Calculator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
            Calculate your cumulative GPA across all semesters. Choose between Quick Mode for estimates 
            or Detailed Mode for comprehensive semester-by-semester analysis.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode('quick')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                mode === 'quick'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Calculator className="h-4 w-4 inline mr-2" />
              Quick Mode
            </button>
            <button
              onClick={() => setMode('detailed')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                mode === 'detailed'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Detailed Mode
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {mode === 'quick' ? (
              /* Quick Mode Form */
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick CGPA Calculation</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current CGPA
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={currentCGPA}
                      onChange={(e) => setCurrentCGPA(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Completed Credits
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={completedCredits}
                      onChange={(e) => setCompletedCredits(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Semester GPA
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={currentSemesterGPA}
                      onChange={(e) => setCurrentSemesterGPA(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Semester Credits
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={currentSemesterCredits}
                      onChange={(e) => setCurrentSemesterCredits(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Detailed Mode Form */
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Semester Details</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={addSemester}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Semester</span>
                    </button>
                    {semesters.length > 0 && (
                      <button
                        onClick={clearAll}
                        className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>
                </div>

                {semesters.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No semesters added yet. Click "Add Semester" to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {semesters.map((semester, index) => (
                      <div
                        key={semester.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Semester {index + 1}
                          </span>
                          <button
                            onClick={() => removeSemester(semester.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Semester Name
                            </label>
                            <input
                              type="text"
                              value={semester.name}
                              onChange={(e) => updateSemester(semester.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              GPA
                            </label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              step="0.01"
                              value={semester.gpa}
                              onChange={(e) => updateSemester(semester.id, 'gpa', parseFloat(e.target.value) || 0)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Credits
                            </label>
                            <input
                              type="number"
                              min="1"
                              value={semester.totalCredits}
                              onChange={(e) => updateSemester(semester.id, 'totalCredits', parseInt(e.target.value) || 1)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Results and Visualization */}
          <div className="space-y-6">
            {/* CGPA Display */}
            {(mode === 'quick' || semesters.length > 0) && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Your CGPA</h3>
                  <div className="text-5xl font-bold mb-2">{displayCGPA.toFixed(2)}</div>
                  <div className="text-green-100">
                    <span className="font-medium">{performance.level}</span>
                    <br />
                    <span className="text-sm">{performance.description}</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <div className="text-2xl font-bold">
                      {mode === 'quick' ? 1 : semesters.length}
                    </div>
                    <div className="text-green-100 text-sm">
                      {mode === 'quick' ? 'Current Sem' : 'Semesters'}
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-3">
                    <button
                      onClick={downloadReport}
                      className="flex items-center justify-center space-x-1 text-white hover:text-green-200 transition-colors w-full"
                    >
                      <Download className="h-4 w-4" />
                      <span className="text-sm">Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Visualization */}
            {((mode === 'quick') || (mode === 'detailed' && semesters.length > 0)) && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Academic Progress
                </h4>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                      <XAxis 
                        dataKey="semester" 
                        className="text-xs"
                        tick={{ fill: 'currentColor' }}
                      />
                      <YAxis 
                        domain={[0, 10]} 
                        className="text-xs"
                        tick={{ fill: 'currentColor' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--tooltip-bg)', 
                          border: '1px solid var(--tooltip-border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="gpa" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                        name="Semester GPA"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cumulative" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                        name="Cumulative GPA"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Semester Breakdown Table */}
            {mode === 'detailed' && semesters.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Semester Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Semester</th>
                        <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">GPA</th>
                        <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Credits</th>
                        <th className="text-center py-2 px-3 font-medium text-gray-700 dark:text-gray-300">Grade Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      {semesters.map((semester) => {
                        const gradePoints = semester.gpa * semester.totalCredits;
                        return (
                          <tr key={semester.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="py-2 px-3 text-gray-900 dark:text-white">{semester.name}</td>
                            <td className="py-2 px-3 text-center text-gray-700 dark:text-gray-300">{semester.gpa.toFixed(2)}</td>
                            <td className="py-2 px-3 text-center text-gray-700 dark:text-gray-300">{semester.totalCredits}</td>
                            <td className="py-2 px-3 text-center font-medium text-gray-900 dark:text-white">{gradePoints.toFixed(1)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-300 dark:border-gray-600 font-semibold">
                        <td className="py-2 px-3 text-gray-900 dark:text-white">Total</td>
                        <td className="py-2 px-3 text-center text-gray-900 dark:text-white">
                          {detailedCGPA.toFixed(2)}
                        </td>
                        <td className="py-2 px-3 text-center text-gray-900 dark:text-white">
                          {semesters.reduce((sum, sem) => sum + sem.totalCredits, 0)}
                        </td>
                        <td className="py-2 px-3 text-center text-gray-900 dark:text-white">
                          {semesters.reduce((sum, sem) => sum + (sem.gpa * sem.totalCredits), 0).toFixed(1)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* Getting Started Message */}
            {mode === 'detailed' && semesters.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Start Adding Semesters
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Add your semester GPAs and credits to see your CGPA calculation, visual progress, 
                  and detailed breakdown.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-green-50 dark:bg-green-900 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
            💡 CGPA Calculation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800 dark:text-green-200 text-sm">
            <ul className="space-y-2">
              <li>• <strong>Quick Mode:</strong> Perfect for current semester projections</li>
              <li>• <strong>Detailed Mode:</strong> Comprehensive semester-by-semester analysis</li>
              <li>• Your data is automatically saved in your browser</li>
            </ul>
            <ul className="space-y-2">
              <li>• CGPA is calculated as weighted average of all semester GPAs</li>
              <li>• Maintaining consistent performance across semesters is key</li>
              <li>• A CGPA above 8.5 is considered excellent for career opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CGPACalculator;