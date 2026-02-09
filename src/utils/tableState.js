export class TableState {
  constructor() {
    this.currentPage = 1
    this.itemsPerPage = 10
    this.searchTerm = ''
    this.sortField = null
    this.sortDirection = 'asc'
  }

  reset() {
    this.currentPage = 1
    this.itemsPerPage = 10
    this.searchTerm = ''
    this.sortField = null
    this.sortDirection = 'asc'
  }

  setPage(page) {
    this.currentPage = page
  }

  setItemsPerPage(count) {
    this.itemsPerPage = count
    this.currentPage = 1 // Reset to first page
  }

  setSearchTerm(term) {
    this.searchTerm = term
    this.currentPage = 1 // Reset to first page when searching
  }

  toggleSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortField = field
      this.sortDirection = 'asc'
    }
  }

  getState() {
    return {
      currentPage: this.currentPage,
      itemsPerPage: this.itemsPerPage,
      searchTerm: this.searchTerm,
      sortField: this.sortField,
      sortDirection: this.sortDirection
    }
  }
}