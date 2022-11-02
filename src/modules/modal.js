import events from "./events"

class todo {
  constructor(title, dueDate = 'no due date', description, priority, checked, projectName = 'normal', overdue) {
    this.title = title,
    this.dueDate = dueDate,
    this.description = description,
    this.priority = priority,
    this.checked = checked,
    this.overdue = overdue,
    this.projectName = projectName
  }
}

// handle the modal logic and get the task info
(() => {
  // get DOM elements
  const addTodoBtn = document.querySelector('.addTodo')
  const modal = document.querySelector('.modal')
  const overlay = document.querySelector('.overlay')
  const closeModal = document.querySelector('.cancel')
  const addTask = document.querySelector('.confirm')
  const alert = document.querySelector('.alert')

  // get the elements with the task info
  const titleValue = document.querySelector('#todotitle')
  const descriptionValue = document.querySelector('#tododescription')
  const dateValue = document.querySelector('#dueDate')
  const priorityValue = document.querySelectorAll('.priorityBtn')


  let currentPriority = 'lowP';
  addTodoBtn.addEventListener('click', () => {
    modal.classList.remove('hide')
    modal.classList.add('show')
    overlay.classList.remove('overlayHide')
    overlay.classList.add('overlayShow')
    setTimeout(function() {
      modal.style.display = "block"
      overlay.style.display = "block"
    }, 210);

    priorityValue.forEach(el => el.addEventListener('click', (event) => {
      currentPriority = event.target.id
    }))
  }, false)


  closeModal.addEventListener('click', () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
    overlay.classList.add('overlayHide')
    overlay.classList.remove('overlayShow')
    setTimeout(function() {
      modal.style.display = "none"
      overlay.style.display = "none"
    }, 210);

    resetModalInfo()
  }, false)

  
  addTask.addEventListener('click', () => {
    if ( !titleValue.value) {
      alert.innerHTML = 'Please enter the task title'
      return 
    }
    if (!dateValue.value) {
      alert.innerHTML = 'Please add a due date'
      return
    }
    
    const NewTodo = new todo(titleValue.value, dateValue.value, descriptionValue.value, currentPriority)
    closeModal.click()
    resetModalInfo()
    events.emit('newValidTask', NewTodo)
  })
  
  function resetModalInfo() {
    titleValue.value = ''
    descriptionValue.value = ''
    currentPriority = 'lowP'
    alert.innerHTML = ''
  }
})()