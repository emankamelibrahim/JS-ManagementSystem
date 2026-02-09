import { loadInstructors } from './pages/instructors.js'
import { loadStudents } from './pages/students.js'


const buttons = document.querySelectorAll('.Category-button')
const tableContainer = document.querySelector('.tableContainer')

buttons.forEach(button => {
  button.addEventListener('click', async () => {

    buttons.forEach(b => b.classList.remove('active'))

    button.classList.add('active')
    
    const category = button.textContent.toLowerCase()

    if (category === 'employees') {
      const { loadEmployees } = await import('./pages/employees.js')
      loadEmployees(tableContainer)
    } else if (category === 'courses') {
      const { loadCourses } = await import('./pages/courses.js')
      loadCourses(tableContainer)
    }
    else if (category === 'instructors') {
      const { loadInstructors } = await import('./pages/instructors.js')
      loadInstructors(tableContainer)
    }
    else if (category === 'students') {
      const { loadStudents } = await import('./pages/students.js')
      loadStudents(tableContainer)
    }

  })
})


import('./pages/employees.js').then(({ loadEmployees }) => {
  loadEmployees(tableContainer)
})