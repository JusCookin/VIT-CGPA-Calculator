import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subject, Semester, calculateGPA, calculateCGPA, getPerformanceLevel } from './gradeCalculations';

export const generateGPAReport = async (subjects: Subject[], elementId: string) => {
  const gpa = calculateGPA(subjects);
  const performance = getPerformanceLevel(gpa);
  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);

  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('VIT GPA Report', pageWidth / 2, 30, { align: 'center' });

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, 20, { align: 'right' });

  // GPA Summary
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('GPA Summary', margin, 60);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Overall GPA: ${gpa.toFixed(2)}`, margin, 80);
  pdf.text(`Performance Level: ${performance.level}`, margin, 95);
  pdf.text(`Total Subjects: ${subjects.length}`, margin, 110);
  pdf.text(`Total Credits: ${totalCredits}`, margin, 125);

  // Subject Details
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Subject Breakdown', margin, 155);

  let yPosition = 175;
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Subject', margin, yPosition);
  pdf.text('Credits', margin + 80, yPosition);
  pdf.text('Grade', margin + 120, yPosition);
  pdf.text('Points', margin + 150, yPosition);

  yPosition += 10;
  pdf.setFont('helvetica', 'normal');

  subjects.forEach((subject, index) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 30;
    }
    
    const subjectName = subject.name || `Subject ${index + 1}`;
    pdf.text(subjectName.substring(0, 20), margin, yPosition);
    pdf.text(subject.credits.toString(), margin + 80, yPosition);
    pdf.text(subject.grade, margin + 120, yPosition);
    pdf.text((subject.credits * (subject.grade === 'S' ? 10 : subject.grade === 'A' ? 9 : subject.grade === 'B' ? 8 : subject.grade === 'C' ? 7 : subject.grade === 'D' ? 6 : subject.grade === 'E' ? 5 : 0)).toString(), margin + 150, yPosition);
    yPosition += 15;
  });

  pdf.save(`VIT_GPA_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateCGPAReport = async (semesters: Semester[], mode: 'quick' | 'detailed', quickData?: any) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('VIT CGPA Report', pageWidth / 2, 30, { align: 'center' });

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, 20, { align: 'right' });

  if (mode === 'detailed' && semesters.length > 0) {
    const cgpa = calculateCGPA(semesters);
    const performance = getPerformanceLevel(cgpa);
    const totalCredits = semesters.reduce((sum, sem) => sum + sem.totalCredits, 0);

    // CGPA Summary
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CGPA Summary', margin, 60);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Overall CGPA: ${cgpa.toFixed(2)}`, margin, 80);
    pdf.text(`Performance Level: ${performance.level}`, margin, 95);
    pdf.text(`Total Semesters: ${semesters.length}`, margin, 110);
    pdf.text(`Total Credits: ${totalCredits}`, margin, 125);

    // Semester Details
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Semester Breakdown', margin, 155);

    let yPosition = 175;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Semester', margin, yPosition);
    pdf.text('GPA', margin + 80, yPosition);
    pdf.text('Credits', margin + 120, yPosition);
    pdf.text('Grade Points', margin + 160, yPosition);

    yPosition += 10;
    pdf.setFont('helvetica', 'normal');

    semesters.forEach((semester) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 30;
      }
      
      pdf.text(semester.name, margin, yPosition);
      pdf.text(semester.gpa.toFixed(2), margin + 80, yPosition);
      pdf.text(semester.totalCredits.toString(), margin + 120, yPosition);
      pdf.text((semester.gpa * semester.totalCredits).toFixed(1), margin + 160, yPosition);
      yPosition += 15;
    });
  } else if (mode === 'quick' && quickData) {
    const performance = getPerformanceLevel(quickData.cgpa);

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Quick CGPA Calculation', margin, 60);

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Projected CGPA: ${quickData.cgpa.toFixed(2)}`, margin, 80);
    pdf.text(`Performance Level: ${performance.level}`, margin, 95);
    pdf.text(`Current CGPA: ${quickData.currentCGPA}`, margin, 110);
    pdf.text(`Current Semester GPA: ${quickData.currentSemesterGPA}`, margin, 125);
    pdf.text(`Total Credits: ${quickData.totalCredits}`, margin, 140);
  }

  pdf.save(`VIT_CGPA_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateAttendanceReport = async (attendanceData: any) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;

  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('VIT Attendance Report', pageWidth / 2, 30, { align: 'center' });

  // Date
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth - margin, 20, { align: 'right' });

  // Attendance Summary
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Attendance Summary', margin, 60);

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Current Attendance: ${attendanceData.percentage.toFixed(2)}%`, margin, 80);
  pdf.text(`Classes Attended: ${attendanceData.attended}`, margin, 95);
  pdf.text(`Total Classes: ${attendanceData.total}`, margin, 110);
  pdf.text(`Eligibility Status: ${attendanceData.eligible ? 'Eligible' : 'Debarred'}`, margin, 125);

  if (!attendanceData.eligible && !attendanceData.exempt) {
    pdf.text(`Classes needed for 75%: ${attendanceData.classesNeeded}`, margin, 140);
  }

  if (attendanceData.exempt) {
    pdf.text('Exemption Status: Eligible (CGPA ≥ 9.0 & No Backlogs)', margin, 140);
  }

  pdf.save(`VIT_Attendance_Report_${new Date().toISOString().split('T')[0]}.pdf`);
};