const employees = "http://localhost:3000/employees"

export const employeeAPI = {
  // Read all employees
  getAll: async () => {
    const res = await fetch(employees)
    if (!res.ok) throw new Error('Failed to fetch employees')
    return await res.json()
  },

  // Read single employee by ID
  getById: async (id) => {
    const res = await fetch(`${employees}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch employee')
    return await res.json()
  },

  // Create new employee
create: async (employeeData) => {
  // Make sure we're not sending an id
  const { id, ...dataWithoutId } = employeeData
  
  console.log('Data being sent to server:', dataWithoutId) // Debug log
  
  const res = await fetch(employees, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataWithoutId)
  })
  if (!res.ok) throw new Error('Failed to create employee')
  const result = await res.json()
  console.log('Response from server:', result) // Debug log
  return result
},
  // Update existing employee
  update: async (id, employeeData) => {
    const res = await fetch(`${employees}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employeeData)
    })
    if (!res.ok) throw new Error('Failed to update employee')
    return await res.json()
  },

  // Partial update (PATCH)
  patch: async (id, partialData) => {
    const res = await fetch(`${employees}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partialData)
    })
    if (!res.ok) throw new Error('Failed to patch employee')
    return await res.json()
  },

  // Delete employee
  delete: async (id) => {
    const res = await fetch(`${employees}/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete employee')
    return await res.json()
  }
}