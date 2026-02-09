const students = "http://localhost:3000/students"

export const studentAPI = {
  // Read all students
  getAll: async () => {
    const res = await fetch(students)
    if (!res.ok) throw new Error('Failed to fetch students')
    return await res.json()
  },

  // Read single student by ID
  getById: async (id) => {
    const res = await fetch(`${students}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch student')
    return await res.json()
  },

  // Create new student
create: async (studentData) => {
  const { id, ...dataWithoutId } = studentData
  
  const res = await fetch(students, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataWithoutId)
  })
  if (!res.ok) throw new Error('Failed to create student')
  return await res.json()
},

  // Update existing student
  update: async (id, studentData) => {
    const res = await fetch(`${students}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentData)
    })
    if (!res.ok) throw new Error('Failed to update student')
    return await res.json()
  },

  // Partial update (PATCH)
  patch: async (id, partialData) => {
    const res = await fetch(`${students}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partialData)
    })
    if (!res.ok) throw new Error('Failed to patch student')
    return await res.json()
  },

  // Delete student
  delete: async (id) => {
    const res = await fetch(`${students}/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete student')
    return await res.json()
  }
}