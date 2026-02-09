
import { 
  calculateAverageSalaryByPosition,
  countByGender,
  countByMajor,
  calculateInstructorWorkload
} from './dataProcessor.js';

import {
  createBarChart,
  createPieChart,
  createDoughnutChart,
  createHorizontalBarChart
} from './chartConfig.js';


const API_BASE = 'http://localhost:3000';

async function fetchEmployees() {
  const response = await fetch(`${API_BASE}/employees`);
  return response.json();
}

async function fetchStudents() {
  const response = await fetch(`${API_BASE}/students`);
  return response.json();
}

async function fetchInstructors() {
  const response = await fetch(`${API_BASE}/instructors`);
  return response.json();
}

async function renderAllCharts() {
  try {
    const [employees, students, instructors] = await Promise.all([
      fetchEmployees(),
      fetchStudents(),
      fetchInstructors()
    ]);


    const salaryData = calculateAverageSalaryByPosition(employees);
    const genderData = countByGender(employees);
    const majorData = countByMajor(students);
    const workloadData = calculateInstructorWorkload(instructors);

    // Render charts
    createBarChart('salaryChart', {
      labels: salaryData.labels,
      data: salaryData.data,
      title: 'Average Salary by Position',
      yAxisLabel: 'Salary ($)'
    });

    createPieChart('genderChart', {
      labels: genderData.labels,
      data: genderData.data,
      title: 'Employee Gender Distribution'
    });

    createDoughnutChart('majorChart', {
      labels: majorData.labels,
      data: majorData.data,
      title: 'Students by Major'
    });

    createHorizontalBarChart('workloadChart', {
      labels: workloadData.labels,
      data: workloadData.data,
      title: 'Instructor Workload (Courses Taught)',
      xAxisLabel: 'Number of Courses'
    });

  } catch (error) {
    console.error('Error loading insights:', error);
    alert('Failed to load analytics data');
  }
}


renderAllCharts();