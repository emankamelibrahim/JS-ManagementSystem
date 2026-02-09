/**
 * Filter data based on search term
 * @param {Array} data - Array of objects to filter
 * @param {string} searchTerm - Search term to filter by
 * @param {Array} searchFields - Fields to search in (optional, searches all if not provided)
 * @returns {Array} Filtered data
 */
export function filterData(data, searchTerm, searchFields = null) {
  if (!searchTerm || searchTerm.trim() === '') {
    return data
  }

  const searchLower = searchTerm.toLowerCase().trim()

  return data.filter(item => {
    // If specific fields provided, search only those
    const fieldsToSearch = searchFields || Object.keys(item)
    
    return fieldsToSearch.some(field => {
      const value = item[field]
      
      // Skip id field
      if (field === 'id') return false
      
      // Handle arrays (like courses)
      if (Array.isArray(value)) {
        return value.some(v => String(v).toLowerCase().includes(searchLower))
      }
      
      // Handle regular values
      return String(value).toLowerCase().includes(searchLower)
    })
  })
}

/**
 * Get searchable fields for an entity type
 */
export function getSearchableFields(entityType) {
  const fieldMap = {
    employee: ['name', 'email', 'gender', 'position', 'salary'],
    student: ['name', 'email', 'gender', 'major', 'courses'],
    instructor: ['name', 'email', 'gender', 'position', 'salary', 'courses'],
    course: ['name', 'credit', 'instructor']
  }
  
  return fieldMap[entityType] || null
}