/**
 * Sort data by a specific field
 * @param {Array} data - Array of objects to sort
 * @param {string} field - Field to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted data (new array)
 */
export function sortData(data, field, direction = 'asc') {
  if (!field) {
    return [...data]
  }

  return [...data].sort((a, b) => {
    let aVal = a[field]
    let bVal = b[field]
    
    // Handle arrays (like courses) - join them for comparison
    if (Array.isArray(aVal)) aVal = aVal.join(', ')
    if (Array.isArray(bVal)) bVal = bVal.join(', ')
    
    // Handle numbers
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return direction === 'asc' ? aVal - bVal : bVal - aVal
    }
    
    // Handle strings (case-insensitive)
    aVal = String(aVal).toLowerCase()
    bVal = String(bVal).toLowerCase()
    
    if (direction === 'asc') {
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    } else {
      return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
    }
  })
}

/**
 * Get sortable fields for an entity type
 */
export function getSortableFields(entityType) {
  const fieldMap = {
    employee: ['id', 'name', 'email', 'gender', 'position', 'salary'],
    student: ['id', 'name', 'email', 'gender', 'major'],
    instructor: ['id', 'name', 'email', 'gender', 'position', 'salary'],
    course: ['id', 'name', 'credit', 'instructor']
  }
  
  return fieldMap[entityType] || []
}