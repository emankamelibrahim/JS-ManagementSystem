import { Course } from "../models/course.js"
import { renderTable } from "../ui/renderTable.js"
import { courseAPI } from "../api/courseAPI.js"
import { instructorAPI } from "../api/instructorAPI.js"
import { createModal } from "../ui/modal.js"
import { TableState } from "../utils/tableState.js"
import { filterData, getSearchableFields } from "../utils/dataFilters.js"
import { sortData } from "../utils/dataSorting.js"

let allCourses = []
const tableState = new TableState()

export const loadCourses = async (tableContainer) => {
  try {
    const raw = await courseAPI.getAll()
    allCourses = raw.map(c => new Course(c))
    renderCoursesTable(tableContainer)
  } catch (error) {
    console.error('Error loading courses:', error)
    tableContainer.innerHTML = '<p>Error loading courses</p>'
  }
}

function renderCoursesTable(tableContainer) {
  const state = tableState.getState()
  

  let processedData = filterData(
    allCourses, 
    state.searchTerm,
    getSearchableFields('course')
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
      renderCoursesTable(tableContainer)
    },
    onItemsPerPageChange: (count) => {
      tableState.setItemsPerPage(count)
      renderCoursesTable(tableContainer)
    },
    onSearch: (term) => {
      tableState.setSearchTerm(term)
      renderCoursesTable(tableContainer)
    },
    onSort: (field) => {
      tableState.toggleSort(field)
      renderCoursesTable(tableContainer)
    }
  })
}

const handleAdd = async () => {

  const instructors = await instructorAPI.getAll()
  
  createModal('Add Course', [
    { name: 'name', label: 'Course Name', required: true },
    { name: 'credit', label: 'Credit Hours', type: 'number', required: true },
    { 
      name: 'instructor', 
      label: 'Instructor', 
      type: 'select',
      required: true,
      placeholder: 'Select Instructor',
      options: instructors.map(i => ({ value: i.name, label: i.name }))
    }
  ], (data) => {
    courseAPI.create({
      ...data,
      credit: parseInt(data.credit)
    })
    .then(() => {
      alert("Course added successfully!")
      loadCourses(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error adding course: " + error.message)
    })
  })
}

const handleEdit = async (id, rowData) => {
  // Fetch instructors for dropdown
  const instructors = await instructorAPI.getAll()
  
  createModal('Edit Course', [
    { name: 'name', label: 'Course Name', value: rowData.name, required: true },
    { name: 'credit', label: 'Credit Hours', type: 'number', value: rowData.credit, required: true },
    { 
      name: 'instructor', 
      label: 'Instructor', 
      type: 'select',
      value: rowData.instructor,
      required: true,
      options: instructors.map(i => ({ value: i.name, label: i.name }))
    }
  ], (data) => {
    courseAPI.update(id, {
      ...data,
      credit: parseInt(data.credit)
    })
    .then(() => {
      alert("Course updated successfully!")
      loadCourses(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error updating course: " + error.message)
    })
  })
}

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this course?")) {
    courseAPI.delete(id)
    .then(() => {
      alert("Course deleted successfully!")
      loadCourses(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error deleting course: " + error.message)
    })
  }
}