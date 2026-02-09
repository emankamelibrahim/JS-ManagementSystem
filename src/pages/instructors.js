import { Instructor } from "../models/instructor.js"
import { renderTable } from "../ui/renderTable.js"
import { instructorAPI } from "../api/instructorAPI.js"
import { courseAPI } from "../api/courseAPI.js"
import { createModal } from "../ui/modal.js"
import { TableState } from "../utils/tableState.js"
import { filterData, getSearchableFields } from "../utils/dataFilters.js"
import { sortData } from "../utils/dataSorting.js"

let allInstructors = []
const tableState = new TableState()

export const loadInstructors = async (tableContainer) => {
  try {
    const raw = await instructorAPI.getAll()
    allInstructors = raw.map(i => new Instructor(i))
    renderInstructorsTable(tableContainer)
  } catch (error) {
    console.error('Error loading instructors:', error)
    tableContainer.innerHTML = '<p>Error loading instructors</p>'
  }
}

function renderInstructorsTable(tableContainer) {
  const state = tableState.getState()

  let processedData = filterData(
    allInstructors, 
    state.searchTerm,
    getSearchableFields('instructor')
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
      renderInstructorsTable(tableContainer)
    },
    onItemsPerPageChange: (count) => {
      tableState.setItemsPerPage(count)
      renderInstructorsTable(tableContainer)
    },
    onSearch: (term) => {
      tableState.setSearchTerm(term)
      renderInstructorsTable(tableContainer)
    },
    onSort: (field) => {
      tableState.toggleSort(field)
      renderInstructorsTable(tableContainer)
    }
  })
}

const handleAdd = async () => {

  const courses = await courseAPI.getAll()
  
  createModal('Add Instructor', [
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
    { name: 'position', label: 'Position', value: 'Instructor', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true },
    { 
      name: 'courses', 
      label: 'Courses', 
      type: 'select',
      multiple: true,
      required: true,
      options: courses.map(c => ({ value: c.name, label: c.name }))
    }
  ], (data) => {
    instructorAPI.create({
      ...data,
      salary: parseFloat(data.salary)
    })
    .then(() => {
      alert("Instructor added successfully!")
      loadInstructors(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error adding instructor: " + error.message)
    })
  })
}

const handleEdit = async (id, rowData) => {

  const courses = await courseAPI.getAll()
  
  createModal('Edit Instructor', [
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
    { name: 'position', label: 'Position', value: rowData.position, required: true },
    { name: 'salary', label: 'Salary', type: 'number', value: rowData.salary, required: true },
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
    instructorAPI.update(id, {
      ...data,
      salary: parseFloat(data.salary)
    })
    .then(() => {
      alert("Instructor updated successfully!")
      loadInstructors(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error updating instructor: " + error.message)
    })
  })
}

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this instructor?")) {
    instructorAPI.delete(id)
    .then(() => {
      alert("Instructor deleted successfully!")
      loadInstructors(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error deleting instructor: " + error.message)
    })
  }
}