export function createModal(title, fields, onSubmit) {
  const modal = document.createElement('div')
  modal.className = 'modal'
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>${title}</h2>
      <form class="modal-form">
        ${fields.map(field => {
          if (field.type === 'select') {
            return `
              <div class="form-group">
                <label for="${field.name}">${field.label}:</label>
                <select 
                  id="${field.name}" 
                  name="${field.name}" 
                  ${field.multiple ? 'multiple' : ''}
                  ${field.required ? 'required' : ''}
                >
                  ${field.placeholder ? `<option value="">${field.placeholder}</option>` : ''}
                  ${field.options.map(opt => `
                    <option value="${opt.value}" ${field.value === opt.value || (Array.isArray(field.value) && field.value.includes(opt.value)) ? 'selected' : ''}>
                      ${opt.label}
                    </option>
                  `).join('')}
                </select>
              </div>
            `
          } else {
            return `
              <div class="form-group">
                <label for="${field.name}">${field.label}:</label>
                <input 
                  type="${field.type || 'text'}" 
                  id="${field.name}" 
                  name="${field.name}" 
                  value="${field.value || ''}"
                  ${field.required ? 'required' : ''}
                >
              </div>
            `
          }
        }).join('')}
        <button type="submit" class="submit-btn">Submit</button>
        <button type="button" class="cancel-btn">Cancel</button>
      </form>
    </div>
  `

  document.body.appendChild(modal)

  const form = modal.querySelector('.modal-form')
  const closeBtn = modal.querySelector('.close')
  const cancelBtn = modal.querySelector('.cancel-btn')

  const closeModal = () => {
    document.body.removeChild(modal)
  }

  closeBtn.addEventListener('click', closeModal)
  cancelBtn.addEventListener('click', closeModal)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = {}
    
    // Handle regular fields and multi-select
    for (let [key, value] of formData.entries()) {
      const field = fields.find(f => f.name === key)
      if (field && field.multiple) {

        const select = form.querySelector(`[name="${key}"]`)
        data[key] = Array.from(select.selectedOptions).map(opt => opt.value)
      } else {
        data[key] = value
      }
    }
    
    onSubmit(data)
    closeModal()
  })

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
}