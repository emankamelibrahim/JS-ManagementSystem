import { Student } from "../models/student.js"
import { renderTable } from "../ui/renderTable.js"
import { studentAPI } from "../api/studentAPI.js"
import { courseAPI } from "../api/courseAPI.js"
import { createModal } from "../ui/modal.js"
import { TableState } from "../utils/tableState.js"
import { filterData, getSearchableFields } from "../utils/dataFilters.js"
import { sortData } from "../utils/dataSorting.js"

let allStudents = []
const tableState = new TableState()

export const loadStudents = async (tableContainer) => {
  try {
    const raw = await studentAPI.getAll()
    allStudents = raw.map(s => new Student(s))
    renderStudentsTable(tableContainer)
  } catch (error) {
    console.error('Error loading students:', error)
    tableContainer.innerHTML = '<p>Error loading students</p>'
  }
}

function renderStudentsTable(tableContainer) {
  const state = tableState.getState()
  
  let processedData = filterData(
    allStudents, 
    state.searchTerm,
    getSearchableFields('student')
  )
  
  processedData = sortData(
    processedData,
    state.sortField,
    state.sortDirection
  )


  renderTable(processedData, tableContainer, {
    onAdd: handleAdd,
    onEdit: handleEdit,
    onDelete: handleDelete
  }, {
    ...state,
    onPageChange: (page) => {
      tableState.setPage(page)
      renderStudentsTable(tableContainer)
    },
    onItemsPerPageChange: (count) => {
      tableState.setItemsPerPage(count)
      renderStudentsTable(tableContainer)
    },
    onSearch: (term) => {
      tableState.setSearchTerm(term)
      renderStudentsTable(tableContainer)
    },
    onSort: (field) => {
      tableState.toggleSort(field)
      renderStudentsTable(tableContainer)
    }
  })
}

const handleAdd = async () => {

  const courses = await courseAPI.getAll()
  
  createModal('Add Student', [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { 
      name: 'gender', 
      label: 'Gender', 
      type: 'select',
      required: true,
      placeholder: 'Select Gender',
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    { name: 'major', label: 'Major', required: true },
    { 
      name: 'courses', 
      label: 'Courses', 
      type: 'select',
      multiple: true,
      required: true,
      options: courses.map(c => ({ value: c.name, label: c.name }))
    }
  ], (data) => {
    studentAPI.create(data)
    .then(() => {
      alert("Student added successfully!")
      loadStudents(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error adding student: " + error.message)
    })
  })
}

const handleEdit = async (id, rowData) => {

  const courses = await courseAPI.getAll()
  
  createModal('Edit Student', [
    { name: 'name', label: 'Name', value: rowData.name, required: true },
    { name: 'email', label: 'Email', type: 'email', value: rowData.email, required: true },
    { 
      name: 'gender', 
      label: 'Gender', 
      type: 'select',
      value: rowData.gender,
      required: true,
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]
    },
    { name: 'major', label: 'Major', value: rowData.major, required: true },
    { 
      name: 'courses', 
      label: 'Courses', 
      type: 'select',
      multiple: true,
      value: rowData.courses,
      required: true,
      options: courses.map(c => ({ value: c.name, label: c.name }))
    }
  ], (data) => {
    studentAPI.update(id, data)
    .then(() => {
      alert("Student updated successfully!")
      loadStudents(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error updating student: " + error.message)
    })
  })
}

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this student?")) {
    studentAPI.delete(id)
    .then(() => {
      alert("Student deleted successfully!")
      loadStudents(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error deleting student: " + error.message)
    })
  }
}