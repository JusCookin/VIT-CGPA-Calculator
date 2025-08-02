import React from 'react';
import { Calculator, BarChart3, BookOpen, TrendingUp, Users, Award, UserCheck } from 'lucide-react';
import GradingSystemTable from '../components/GradingSystemTable';
import FeatureCard from '../components/FeatureCard';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              VIT GPA & CGPA
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent block">
                Calculator
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Your comprehensive academic companion for tracking and planning your academic performance at VIT University
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <Users className="h-5 w-5 mr-2" />
                <span>Check Your Grades in seconds!!!</span>
              </div>
              <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <Award className="h-5 w-5 mr-2" />
                <span>Working Tested</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            title="GPA Calculator"
            description="Calculate your semester GPA with our intuitive interface. Add subjects, input credits and grades, and get instant results with detailed breakdown."
            icon={Calculator}
            to="/gpa-calculator"
            color="hover:border-blue-300"
          />
          <FeatureCard
            title="CGPA Calculator"
            description="Track your overall academic performance across semesters. Use quick mode for estimates or detailed mode for comprehensive analysis."
            icon={BarChart3}
            to="/cgpa-calculator"
            color="hover:border-green-300"
          />
          <FeatureCard
            title="Attendance Calculator"
            description="Monitor your attendance percentage and check exam eligibility. Calculate required classes to meet VIT's 75% attendance requirement."
            icon={UserCheck}
            to="/attendance-calculator"
            color="hover:border-orange-300"
          />
        </div>

        {/* Grading System */}
        <div className="mb-16">
          <GradingSystemTable />
        </div>

        {/* Formula Explanations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                📐
              </span>
              GPA Formula
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                GPA = Σ(Credits × Grade Points) / Σ(Credits)
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your GPA is calculated by multiplying each subject's credits by its grade points, 
              summing all products, and dividing by the total credits for that semester.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                📊
              </span>
              CGPA Formula
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                CGPA = Σ(GPA × Credits) / Σ(Credits)
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your CGPA is the weighted average of all your semester GPAs, 
              considering the credit hours of each semester.
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg mr-3">
              💡
            </span>
            Tips for VIT Students
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Stay Consistent</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Maintain steady performance across all semesters for better CGPA.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Regular monitoring helps identify areas for improvement early.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Aim High</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A CGPA above 8.5 opens doors to excellent career opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;