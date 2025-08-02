export interface AttendanceData {
  attended: number;
  total: number;
  percentage: number;
  eligible: boolean;
  exempt: boolean;
  classesNeeded: number;
  registrationDate?: string;
  examStartDate?: string;
  cgpa?: number;
  hasBacklogs?: boolean;
}

export const calculateAttendance = (
  attended: number,
  total: number,
  cgpa: number = 0,
  hasBacklogs: boolean = false
): AttendanceData => {
  const percentage = total > 0 ? (attended / total) * 100 : 0;
  
  // Check for exemption (CGPA ≥ 9.0 and no backlogs)
  const exempt = cgpa >= 9.0 && !hasBacklogs;
  
  // Calculate eligibility
  const eligible = percentage >= 75 || exempt;
  
  // Calculate classes needed to reach 75%
  let classesNeeded = 0;
  if (!eligible && !exempt) {
    // Formula: (attended + x) / (total + x) = 0.75
    // Solving for x: attended + x = 0.75 * (total + x)
    // attended + x = 0.75 * total + 0.75 * x
    // attended + x - 0.75 * x = 0.75 * total
    // attended + 0.25 * x = 0.75 * total
    // 0.25 * x = 0.75 * total - attended
    // x = (0.75 * total - attended) / 0.25
    classesNeeded = Math.ceil((0.75 * total - attended) / 0.25);
    if (classesNeeded < 0) classesNeeded = 0;
  }

  return {
    attended,
    total,
    percentage,
    eligible,
    exempt,
    classesNeeded
  };
};

export const getAttendanceStatus = (percentage: number, exempt: boolean) => {
  if (exempt) {
    return {
      status: 'Exempt',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900',
      borderColor: 'border-blue-200 dark:border-blue-800',
      description: 'Eligible due to high CGPA (≥9.0) and no backlogs'
    };
  }
  
  if (percentage >= 75) {
    return {
      status: 'Eligible',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900',
      borderColor: 'border-green-200 dark:border-green-800',
      description: 'Meeting minimum attendance requirement'
    };
  }
  
  return {
    status: 'Debarred',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-50 dark:bg-red-900',
    borderColor: 'border-red-200 dark:border-red-800',
    description: 'Below minimum attendance requirement (75%)'
  };
};