import { paginateData, generatePageNumbers, ITEMS_PER_PAGE_OPTIONS } from "../utils/pagination.js"

export function renderTable(data, tableContainer, callbacks = {}, options = {}) {
  const { onAdd, onEdit, onDelete } = callbacks
  const {
    currentPage = 1,
    itemsPerPage = 10,
    searchTerm = '',
    sortField = null,
    sortDirection = 'asc',
    onPageChange,
    onItemsPerPageChange,
    onSearch,
    onSort
  } = options
  
  if (!data || data.length === 0) {
    tableContainer.innerHTML = "<p>no data available</p>"
    return
  }

  const headers = Object.keys(data[0])


  const { data: paginatedData, pagination } = paginateData(data, currentPage, itemsPerPage)

  tableContainer.innerHTML = `
    <div class="table-controls">
      <div class="left-controls">
        <button class="add-btn" type="button">
          <img src="../resources/icon/add.png" width="20" height="20" alt="Add">
        </button>
        
        <div class="search-container">
          <input 
            type="text" 
            class="search-input" 
            placeholder="Search..." 
            value="${searchTerm}"
          >
        </div>
      </div>
      
      <div class="right-controls">
        <label for="itemsPerPage">Items per page:</label>
        <select id="itemsPerPage" class="items-per-page">
          ${ITEMS_PER_PAGE_OPTIONS.map(num => 
            `<option value="${num}" ${itemsPerPage === num ? 'selected' : ''}>${num}</option>`
          ).join('')}
        </select>
      </div>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          ${headers.map(h => `
            <th class="sortable" data-field="${h}">
              ${h.toUpperCase()}
              <span class="sort-icon">
                ${sortField === h 
                  ? (sortDirection === 'asc' ? '▲' : '▼') 
                  : '⇅'
                }
              </span>
            </th>
          `).join("")}
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        ${paginatedData.length > 0 ? paginatedData.map((row) => `
          <tr data-id="${row.id}">
            ${headers.map(h => {
              const value = row[h]
              return `<td>${
                Array.isArray(value) ? value.join("<br>") : value
              }</td>`
            }).join("")}
            <td class="actions">
              <img src="../resources/icon/edit-blue.png" alt="edit" class="icon edit-btn" data-id="${row.id}" width="25" height="25">
              <img src="../resources/icon/delete.png" alt="delete" class="icon delete-btn" data-id="${row.id}" width="25" height="25">
            </td>
          </tr>
        `).join("") : `
          <tr>
            <td colspan="${headers.length + 1}" style="text-align: center;">No results found</td>
          </tr>
        `}
      </tbody>
    </table>

    <div class="pagination">
      <div class="pagination-info">
        Showing ${pagination.startIndex} to ${pagination.endIndex} of ${pagination.totalItems} entries
        ${searchTerm ? `(filtered)` : ''}
      </div>
      <div class="pagination-controls">
        <button class="page-btn" data-page="1" ${!pagination.hasPreviousPage ? 'disabled' : ''}>First</button>
        <button class="page-btn" data-page="${currentPage - 1}" ${!pagination.hasPreviousPage ? 'disabled' : ''}>Previous</button>
        
        ${generatePageNumbers(currentPage, pagination.totalPages)
          .map(page => {
            if (page === '...') {
              return '<span class="page-ellipsis">...</span>'
            }
            return `<button class="page-btn ${page === currentPage ? 'active' : ''}" data-page="${page}">${page}</button>`
          }).join('')}
        
        <button class="page-btn" data-page="${currentPage + 1}" ${!pagination.hasNextPage ? 'disabled' : ''}>Next</button>
        <button class="page-btn" data-page="${pagination.totalPages}" ${!pagination.hasNextPage ? 'disabled' : ''}>Last</button>
      </div>
    </div>
  `

  attachEventListeners(tableContainer, data, callbacks, {
    onPageChange,
    onItemsPerPageChange,
    onSearch,
    onSort
  })
}

function attachEventListeners(tableContainer, data, callbacks, handlers) {
  const { onAdd, onEdit, onDelete } = callbacks
  const { onPageChange, onItemsPerPageChange, onSearch, onSort } = handlers

  const addBtn = tableContainer.querySelector('.add-btn')
  const searchInput = tableContainer.querySelector('.search-input')
  const itemsPerPageSelect = tableContainer.querySelector('.items-per-page')
  const pageButtons = tableContainer.querySelectorAll('.page-btn')
  const sortableHeaders = tableContainer.querySelectorAll('.sortable')
  const editBtns = tableContainer.querySelectorAll('.edit-btn')
  const deleteBtns = tableContainer.querySelectorAll('.delete-btn')

  if (addBtn && onAdd) {
    addBtn.addEventListener('click', onAdd)
  }

  if (searchInput && onSearch) {
    searchInput.addEventListener('input', (e) => onSearch(e.target.value))
  }

  if (itemsPerPageSelect && onItemsPerPageChange) {
    itemsPerPageSelect.addEventListener('change', (e) => {
      onItemsPerPageChange(parseInt(e.target.value))
    })
  }

  pageButtons.forEach(btn => {
    if (!btn.disabled && onPageChange) {
      btn.addEventListener('click', () => {
        onPageChange(parseInt(btn.dataset.page))
      })
    }
  })

  sortableHeaders.forEach(header => {
    if (onSort) {
      header.addEventListener('click', () => onSort(header.dataset.field))
    }
  })

  editBtns.forEach(btn => {
    if (onEdit) {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id
        const rowData = data.find(item => item.id == id)
        if (rowData) onEdit(id, rowData)
      })
    }
  })

  deleteBtns.forEach(btn => {
    if (onDelete) {
      btn.addEventListener('click', (e) => {
        onDelete(e.target.dataset.id)
      })
    }
  })
}