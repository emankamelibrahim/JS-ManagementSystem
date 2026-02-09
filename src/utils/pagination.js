/**
 * Paginate data
 * @param {Array} data - Array of data to paginate
 * @param {number} currentPage - Current page number (1-indexed)
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Paginated data with metadata
 */
export function paginateData(data, currentPage, itemsPerPage) {
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Ensure current page is within bounds
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1))
  
  const startIndex = (validPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = data.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    pagination: {
      currentPage: validPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startIndex: startIndex + 1, // 1-indexed for display
      endIndex: Math.min(endIndex, totalItems),
      hasNextPage: validPage < totalPages,
      hasPreviousPage: validPage > 1
    }
  }
}

/**
 * Generate page numbers for pagination UI
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxVisible - Max visible page numbers
 * @returns {Array} Array of page numbers or '...'
 */
export function generatePageNumbers(currentPage, totalPages, maxVisible = 5) {
  let pages = []
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, '...', totalPages]
    } else if (currentPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    } else {
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }
  }
  
  return pages
}

/**
 * Get available items per page options
 */
export const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20, 25]