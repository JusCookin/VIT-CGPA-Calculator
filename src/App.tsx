import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import GPACalculator from './pages/GPACalculator';
import CGPACalculator from './pages/CGPACalculator';
import AttendanceCalculator from './pages/AttendanceCalculator';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gpa-calculator" element={<GPACalculator />} />
            <Route path="/cgpa-calculator" element={<CGPACalculator />} />
            <Route path="/attendance-calculator" element={<AttendanceCalculator />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;