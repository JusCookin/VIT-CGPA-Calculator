import React, { useState } from 'react';
import { Calendar, Users, AlertTriangle, CheckCircle, Download, RefreshCw } from 'lucide-react';
import { calculateAttendance, getAttendanceStatus, AttendanceData } from '../utils/attendanceCalculations';
import { generateAttendanceReport } from '../utils/pdfGenerator';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AttendanceCalculator: React.FC = () => {
  const [attendanceData, setAttendanceData] = useLocalStorage('attendance-data', {
    attended: 0,
    total: 0,
    cgpa: 0,
    hasBacklogs: false,
    registrationDate: '',
    examStartDate: ''
  });

  const [showExemption, setShowExemption] = useState(false);

  const handleInputChange = (field: string, value: number | boolean | string) => {
    setAttendanceData(prev => ({ ...prev, [field]: value }));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all attendance data?')) {
      setAttendanceData({
        attended: 0,
        total: 0,
        cgpa: 0,
        hasBacklogs: false,
        registrationDate: '',
        examStartDate: ''
      });
    }
  };

  const downloadReport = async () => {
    const calculatedData = calculateAttendance(
      attendanceData.attended,
      attendanceData.total,
      attendanceData.cgpa,
      attendanceData.hasBacklogs
    );
    await generateAttendanceReport(calculatedData);
  };

  const calculatedAttendance = calculateAttendance(
    attendanceData.attended,
    attendanceData.total,
    attendanceData.cgpa,
    attendanceData.hasBacklogs
  );

  const statusInfo = getAttendanceStatus(calculatedAttendance.percentage, calculatedAttendance.exempt);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mr-4">
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Attendance Calculator
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg max-w-3xl mx-auto px-4">
            Calculate your attendance percentage and check eligibility for VIT examinations. 
            Track your progress and plan accordingly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setShowExemption(!showExemption)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">{showExemption ? 'Hide' : 'Show'} Exemption</span>
            <span className="sm:hidden">Exemption</span>
          </button>
          
          <button
            onClick={downloadReport}
            disabled={attendanceData.total === 0}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              attendanceData.total > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">PDF</span>
          </button>
          
          <button
            onClick={clearAll}
            disabled={attendanceData.total === 0}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              attendanceData.total > 0
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
            <span className="sm:hidden">Clear</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Input Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* Basic Attendance Input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Attendance Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Classes Attended *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={attendanceData.attended}
                      onChange={(e) => handleInputChange('attended', parseInt(e.target.value) || 0)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="e.g., 45"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Total Classes Held *
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={attendanceData.total}
                      onChange={(e) => handleInputChange('total', parseInt(e.target.value) || 0)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="e.g., 60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Registration Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={attendanceData.registrationDate}
                      onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Exam Start Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={attendanceData.examStartDate}
                      onChange={(e) => handleInputChange('examStartDate', e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Exemption Section */}
            {showExemption && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
                  Exemption Criteria
                </h3>
                
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
                      value={attendanceData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="e.g., 9.2"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hasBacklogs"
                      checked={attendanceData.hasBacklogs}
                      onChange={(e) => handleInputChange('hasBacklogs', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hasBacklogs" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      I have pending backlogs
                    </label>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900 p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
                      <strong>Exemption Rule:</strong> Students with CGPA ≥ 9.0 and no pending backlogs 
                      are exempt from the 75% attendance requirement.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4 sm:space-y-6">
            {attendanceData.total > 0 ? (
              <>
                {/* Attendance Status */}
                <div className={`rounded-xl shadow-lg p-4 sm:p-6 border ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      Attendance Status
                    </h3>
                    <div className={`text-3xl sm:text-5xl font-bold mb-2 ${statusInfo.color}`}>
                      {calculatedAttendance.percentage.toFixed(2)}%
                    </div>
                    <div className={`font-medium text-sm sm:text-base ${statusInfo.color}`}>
                      {statusInfo.status}
                    </div>
                    <p className={`text-xs sm:text-sm mt-2 ${statusInfo.color}`}>
                      {statusInfo.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 rounded-lg p-2 sm:p-3">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {attendanceData.attended}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Attended</div>
                    </div>
                    <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-50 rounded-lg p-2 sm:p-3">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {attendanceData.total}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Total Classes</div>
                    </div>
                  </div>
                </div>

                {/* Action Required */}
                {!calculatedAttendance.eligible && !calculatedAttendance.exempt && (
                  <div className="bg-red-50 dark:bg-red-900 rounded-xl shadow-lg p-4 sm:p-6 border border-red-200 dark:border-red-800">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                          Action Required
                        </h4>
                        <p className="text-red-700 dark:text-red-300 text-sm sm:text-base mb-3">
                          Your attendance is below the required 75%. You need to attend more classes to become eligible.
                        </p>
                        <div className="bg-red-100 dark:bg-red-800 rounded-lg p-3 sm:p-4">
                          <p className="text-red-800 dark:text-red-200 font-medium text-sm sm:text-base">
                            Classes needed to reach 75%: 
                            <span className="text-lg sm:text-xl font-bold ml-2">
                              {calculatedAttendance.classesNeeded}
                            </span>
                          </p>
                          <p className="text-red-700 dark:text-red-300 text-xs sm:text-sm mt-2">
                            After attending {calculatedAttendance.classesNeeded} more classes, 
                            your attendance will be {((attendanceData.attended + calculatedAttendance.classesNeeded) / (attendanceData.total + calculatedAttendance.classesNeeded) * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Exemption Status */}
                {calculatedAttendance.exempt && (
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-xl shadow-lg p-4 sm:p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                          Exemption Granted
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm sm:text-base">
                          Congratulations! You are exempt from the 75% attendance requirement due to your 
                          excellent academic performance (CGPA ≥ 9.0) and no pending backlogs.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Visualization */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Attendance Progress
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Current Progress</span>
                      <span>{calculatedAttendance.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          calculatedAttendance.percentage >= 75 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(calculatedAttendance.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>0%</span>
                      <span className="text-orange-600 dark:text-orange-400 font-medium">75% (Required)</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Enter Attendance Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Add your attendance details to calculate your percentage and check eligibility status.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* VIT Attendance Rules */}
        <div className="mt-8 sm:mt-12 bg-orange-50 dark:bg-orange-900 rounded-xl p-4 sm:p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
            📋 VIT Attendance Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-orange-800 dark:text-orange-200 text-sm">
            <ul className="space-y-2">
              <li>• <strong>Minimum Requirement:</strong> 75% attendance for exam eligibility</li>
              <li>• <strong>Debarment:</strong> Students below 75% cannot appear for exams</li>
              <li>• <strong>Calculation:</strong> (Attended Classes / Total Classes) × 100</li>
            </ul>
            <ul className="space-y-2">
              <li>• <strong>Exemption:</strong> CGPA ≥ 9.0 with no backlogs</li>
              <li>• <strong>Grade Impact:</strong> Debarred students receive 'N' grade</li>
              <li>• <strong>Planning:</strong> Track regularly to avoid last-minute issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;