import { format, getDate } from "date-fns"
import weeksToDays from "date-fns/fp/weeksToDays"
import events from "./events"

class todo {
  constructor(title, dueDate, description, priority, checked, projectName, overdue, uniqueID) {
    this.title = title,
    this.dueDate = dueDate,
    this.description = description,
    this.priority = priority,
    this.checked = checked,
    this.overdue = overdue,
    this.projectName = projectName,
    this.uniqueID = uniqueID
  }
}

// handle the modal logic and get the task info
(() => {
  const closeModal = document.querySelector('.cancel')
  const addTask = document.querySelector('.confirm')
  const alert = document.querySelector('.alert')
  
  // get the elements with the task info
  const titleValue = document.querySelector('#todotitle')
  const descriptionValue = document.querySelector('#tododescription')
  const dateValue = document.querySelector('#dueDate')
  const location = document.querySelector('.location')


  let currentPriority = 'lowP'
  document.querySelectorAll('.sw').forEach(el => {
    el.addEventListener('click', () => {

      // get the modal and overlay
      const modal = document.querySelector('.modal')
      const overlay = document.querySelector('.overlay')

      // remove the animation classes / reset them
      modal.classList.remove('show', 'hide')
      modal.classList.remove('overlayHide', 'overlayShow')

      if (el.classList.value.split(' ')[0] === 'addTodo') {
        // trigger the appearing modal animation
        modal.classList.add('show')
        overlay.classList.add('overlayShow')

        // set task priority
        document.querySelectorAll('.priorityBtn').forEach(el => 
            el.addEventListener('click', (event) => {
          currentPriority = event.target.id
        }))

        setTimeout(function() {
          // show the modal and overlay
          modal.classList.add('active-modal')
          overlay.classList.add('active-overlay')
        }, 210)


      } else if (el.classList.value.split(' ')[0] === 'cancel') {
        // trigger the hiding animation
        modal.classList.add('hide')
        overlay.classList.add('overlayHide')

        setTimeout(function() {
          // hide the modal and overlay
          modal.classList.remove('active-modal')
          overlay.classList.remove('active-overlay')
        }, 210)

        // reset the input values
        resetModalInfo()
      }
    })
  })
  
  addTask.addEventListener('click', () => {

    if (addTask.textContent === 'Confirm') {
      events.emit('taskEditConfirmed', [new todo(titleValue.value, dateValue.value, 
        descriptionValue.value, currentPriority, 'off', location.value, false), titleValue.classList[0]])      
      closeModal.click()
      resetModalInfo()
      return
    }


    // check for a title
    if ( !titleValue.value) {
      alert.innerHTML = 'Please enter the task title'
      return 
    }
    // due dates are required for sorting the tasks
    if (!dateValue.value) {
      alert.innerHTML = 'Please add a due date'
      return
    }

    
    // create new ToDo object and emit it, reset the modal and close it
    const NewTodo = new todo(titleValue.value, dateValue.value, descriptionValue.value, currentPriority, 'off', location.value, false)
    closeModal.click()
    resetModalInfo()
    events.emit('newValidTask', NewTodo)
  })

  document.querySelectorAll('.priorityBtn').forEach(el => el.addEventListener('click', () => {
    
    document.querySelectorAll('.priorityBtn').forEach(btn => {
      btn.classList.remove('active-selection')
    })

    el.classList.add('active-selection')
  }))
  
  function resetModalInfo() {
    titleValue.value = ''
    descriptionValue.value = ''
    currentPriority = 'lowP'
    alert.innerHTML = ''
    dateValue.value = format(new Date, "yyyy-MM-dd")
    addTask.textContent = 'Add Task'
    document.querySelector('#lowP').click()
  }
})()