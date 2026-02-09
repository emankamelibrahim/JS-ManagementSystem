import { Employee } from "../models/employee.js"
import { renderTable } from "../ui/renderTable.js"
import { employeeAPI } from "../api/employeeAPI.js"
import { createModal } from "../ui/modal.js"
import { TableState } from "../utils/tableState.js"
import { filterData, getSearchableFields } from "../utils/dataFilters.js"
import { sortData } from "../utils/dataSorting.js"

let allEmployees = []
const tableState = new TableState()

export const loadEmployees = async (tableContainer) => {
  try {
    const raw = await employeeAPI.getAll()
    allEmployees = raw.map(e => new Employee(e))
    renderEmployeesTable(tableContainer)
  } catch (error) {
    console.error('Error loading employees:', error)
    tableContainer.innerHTML = '<p>Error loading employees</p>'
  }
}

function renderEmployeesTable(tableContainer) {
  const state = tableState.getState()
  
  // Apply filters and sorting using utility functions
  let processedData = filterData(
    allEmployees, 
    state.searchTerm,
    getSearchableFields('employee')
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
      renderEmployeesTable(tableContainer)
    },
    onItemsPerPageChange: (count) => {
      tableState.setItemsPerPage(count)
      renderEmployeesTable(tableContainer)
    },
    onSearch: (term) => {
      tableState.setSearchTerm(term)
      renderEmployeesTable(tableContainer)
    },
    onSort: (field) => {
      tableState.toggleSort(field)
      renderEmployeesTable(tableContainer)
    }
  })
}

const handleAdd = () => {
  createModal('Add Employee', [
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
    { name: 'position', label: 'Position', required: true },
    { name: 'salary', label: 'Salary', type: 'number', required: true }
  ], (data) => {
    employeeAPI.create({
      ...data,
      salary: parseFloat(data.salary)
    })
    .then(() => {
      alert("Employee added successfully!")
      loadEmployees(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error adding employee: " + error.message)
    })
  })
}

const handleEdit = (id, rowData) => {
  createModal('Edit Employee', [
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
    { name: 'salary', label: 'Salary', type: 'number', value: rowData.salary, required: true }
  ], (data) => {
    employeeAPI.update(id, {
      ...data,
      salary: parseFloat(data.salary)
    })
    .then(() => {
      alert("Employee updated successfully!")
      loadEmployees(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error updating employee: " + error.message)
    })
  })
}

const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this employee?")) {
    employeeAPI.delete(id)
    .then(() => {
      alert("Employee deleted successfully!")
      loadEmployees(document.querySelector('.tableContainer'))
    })
    .catch(error => {
      alert("Error deleting employee: " + error.message)
    })
  }
}