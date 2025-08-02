import React from 'react';
import { Plus, X } from 'lucide-react';
import { Subject, Grade, gradePoints } from '../utils/gradeCalculations';

interface SubjectFormProps {
  subjects: Subject[];
  onSubjectsChange: (subjects: Subject[]) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subjects, onSubjectsChange }) => {
  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      credits: 1,
      grade: 'A' as Grade,
    };
    onSubjectsChange([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    onSubjectsChange(subjects.filter(subject => subject.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    onSubjectsChange(
      subjects.map(subject =>
        subject.id === id ? { ...subject, [field]: value } : subject
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subjects</h3>
        <button
          onClick={addSubject}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Subject</span>
        </button>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No subjects added yet. Click "Add Subject" to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {subjects.map((subject, index) => (
            <div
              key={subject.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subject {index + 1}
                </span>
                <button
                  onClick={() => removeSubject(subject.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                    placeholder="e.g., Mathematics"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Credits *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, 'credits', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Grade *
                  </label>
                  <select
                    value={subject.grade}
                    onChange={(e) => updateSubject(subject.id, 'grade', e.target.value as Grade)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(gradePoints).map(([grade, points]) => (
                      <option key={grade} value={grade}>
                        {grade} ({points} points)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectForm;