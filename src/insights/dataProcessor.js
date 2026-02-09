
export function calculateAverageSalaryByPosition(employees) {
  const positionSalaries = {};
  
  employees.forEach(emp => {
    if (!positionSalaries[emp.position]) {
      positionSalaries[emp.position] = { total: 0, count: 0 };
    }
    positionSalaries[emp.position].total += emp.salary;
    positionSalaries[emp.position].count += 1;
  });

  const result = Object.entries(positionSalaries).map(([position, data]) => ({
    position,
    avgSalary: Math.round(data.total / data.count)
  }));

  return {
    labels: result.map(r => r.position),
    data: result.map(r => r.avgSalary)
  };
}

export function countByGender(people) {
  const genderCount = { Male: 0, Female: 0 };
  
  people.forEach(person => {
    if (genderCount.hasOwnProperty(person.gender)) {
      genderCount[person.gender]++;
    }
  });

  return {
    labels: Object.keys(genderCount),
    data: Object.values(genderCount)
  };
}

export function countByMajor(students) {
  const majorCount = {};
  
  students.forEach(student => {
    majorCount[student.major] = (majorCount[student.major] || 0) + 1;
  });

  return {
    labels: Object.keys(majorCount),
    data: Object.values(majorCount)
  };
}

export function calculateInstructorWorkload(instructors) {
  // Sort by course count descending
  const sorted = [...instructors].sort((a, b) => 
    b.courses.length - a.courses.length
  );

  return {
    labels: sorted.map(inst => inst.name),
    data: sorted.map(inst => inst.courses.length)
  };
}

export function getSalaryStatistics(employees) {
  const salaries = employees.map(emp => emp.salary);
  
  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries),
    avg: Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length),
    median: calculateMedian(salaries)
  };
}

function calculateMedian(numbers) {
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  
  return sorted.length % 2 !== 0 
    ? sorted[mid] 
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}