const courses = "http://localhost:3000/courses"

export const courseAPI = {
  // Read all courses
  getAll: async () => {
    const res = await fetch(courses)
    if (!res.ok) throw new Error('Failed to fetch courses')
    return await res.json()
  },

  // Read single course by ID
  getById: async (id) => {
    const res = await fetch(`${courses}/${id}`)
    if (!res.ok) throw new Error('Failed to fetch course')
    return await res.json()
  },

  // Create new course
create: async (courseData) => {
  const { id, ...dataWithoutId } = courseData
  
  const res = await fetch(courses, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataWithoutId)
  })
  if (!res.ok) throw new Error('Failed to create course')
  return await res.json()
},

  // Update existing course
  update: async (id, courseData) => {
    const res = await fetch(`${courses}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData)
    })
    if (!res.ok) throw new Error('Failed to update course')
    return await res.json()
  },

  // Partial update (PATCH)
  patch: async (id, partialData) => {
    const res = await fetch(`${courses}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partialData)
    })
    if (!res.ok) throw new Error('Failed to patch course')
    return await res.json()
  },

  // Delete course
  delete: async (id) => {
    const res = await fetch(`${courses}/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete course')
    return await res.json()
  }
}