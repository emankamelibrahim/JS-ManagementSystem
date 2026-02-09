const instructors = "http://localhost:3000/instructors"

export const instructorAPI = {
  // Read all instructors
  getAll: async () => {
    const res = await fetch(instructors)
    if (!res.ok) throw new Error('Failed to fetch instructors')
    return await res.json()
  },

  // Read single instructor by ID
  getById: async (id) => {
    const res = await fetch(`${instructors}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch instructor')
    return await res.json()
  },

  // Create new instructor
create: async (instructorData) => {
  const { id, ...dataWithoutId } = instructorData
  
  const res = await fetch(instructors, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataWithoutId)
  })
  if (!res.ok) throw new Error('Failed to create instructor')
  return await res.json()
},

  // Update existing instructor
  update: async (id, instructorData) => {
    const res = await fetch(`${instructors}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(instructorData)
    })
    if (!res.ok) throw new Error('Failed to update instructor')
    return await res.json()
  },

  // Partial update (PATCH)
  patch: async (id, partialData) => {
    const res = await fetch(`${instructors}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partialData)
    })
    if (!res.ok) throw new Error('Failed to patch instructor')
    return await res.json()
  },

  // Delete instructor
  delete: async (id) => {
    const res = await fetch(`${instructors}/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete instructor')
    return await res.json()
  }
}