export const gradePoints = {
  'S': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'E': 5,
  'F': 0,
  'N': 0
} as const;

export type Grade = keyof typeof gradePoints;

export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: Grade;
}

export interface Semester {
  id: string;
  name: string;
  gpa: number;
  totalCredits: number;
  subjects: Subject[];
}

export const calculateGPA = (subjects: Subject[]): number => {
  if (subjects.length === 0) return 0;
  
  const totalPoints = subjects.reduce((sum, subject) => {
    return sum + (subject.credits * gradePoints[subject.grade]);
  }, 0);
  
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

export const calculateCGPA = (semesters: Semester[]): number => {
  if (semesters.length === 0) return 0;
  
  const totalPoints = semesters.reduce((sum, semester) => {
    return sum + (semester.gpa * semester.totalCredits);
  }, 0);
  
  const totalCredits = semesters.reduce((sum, semester) => sum + semester.totalCredits, 0);
  
  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};

export const getPerformanceLevel = (gpa: number): { level: string; color: string; description: string } => {
  if (gpa >= 9.5) return { 
    level: 'Outstanding', 
    color: 'text-emerald-600 dark:text-emerald-400', 
    description: 'Exceptional academic performance' 
  };
  if (gpa >= 9.0) return { 
    level: 'Excellent', 
    color: 'text-green-600 dark:text-green-400', 
    description: 'Excellent academic standing' 
  };
  if (gpa >= 8.0) return { 
    level: 'Very Good', 
    color: 'text-blue-600 dark:text-blue-400', 
    description: 'Strong academic performance' 
  };
  if (gpa >= 7.0) return { 
    level: 'Good', 
    color: 'text-yellow-600 dark:text-yellow-400', 
    description: 'Good academic progress' 
  };
  if (gpa >= 6.0) return { 
    level: 'Satisfactory', 
    color: 'text-orange-600 dark:text-orange-400', 
    description: 'Meets academic requirements' 
  };
  return { 
    level: 'Needs Improvement', 
    color: 'text-red-600 dark:text-red-400', 
    description: 'Focus on academic improvement' 
  };
};

export const calculateRequiredGrades = (
  currentSubjects: Subject[],
  targetGPA: number,
  remainingCredits: number
): { achievable: boolean; requiredPoints: number; suggestedGrades: string } => {
  const currentPoints = currentSubjects.reduce((sum, subject) => 
    sum + (subject.credits * gradePoints[subject.grade]), 0
  );
  const currentCredits = currentSubjects.reduce((sum, subject) => sum + subject.credits, 0);
  const totalCredits = currentCredits + remainingCredits;
  
  const requiredTotalPoints = targetGPA * totalCredits;
  const requiredPoints = requiredTotalPoints - currentPoints;
  const requiredAverage = remainingCredits > 0 ? requiredPoints / remainingCredits : 0;
  
  let suggestedGrades = '';
  if (requiredAverage > 10) {
    suggestedGrades = 'Target not achievable with current grades';
  } else if (requiredAverage >= 9.5) {
    suggestedGrades = 'All remaining subjects need S grade';
  } else if (requiredAverage >= 8.5) {
    suggestedGrades = 'Mix of S and A grades required';
  } else if (requiredAverage >= 7.5) {
    suggestedGrades = 'Mix of A and B grades required';
  } else if (requiredAverage >= 6.5) {
    suggestedGrades = 'B and C grades will suffice';
  } else {
    suggestedGrades = 'C and above grades will achieve target';
  }
  
  return {
    achievable: requiredAverage <= 10,
    requiredPoints: requiredAverage,
    suggestedGrades
  };
};