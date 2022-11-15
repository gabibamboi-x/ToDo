import { format } from "date-fns"
import events from "./events"
import { dom } from "./getDOM"

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
  
  let currentPriority = 'lowP'

  dom.sw.forEach(el => {
    el.addEventListener('click', () => {
      // remove the animation classes / reset them
      dom.modal.classList.remove('show')
      dom.modal.classList.remove('hide')
      dom.modal.classList.remove('overlayHide')
      dom.modal.classList.remove('overlayShow')

      if (el.classList.value.split(' ')[0] === 'addTodo') {
        // trigger the appearing modal animation
        dom.modal.classList.add('show')
        dom.overlay.classList.add('overlayShow')

        // set task priority
        dom.priorityBtns.forEach(el => 
            el.addEventListener('click', (event) => {
          currentPriority = event.target.id
        }))

        setTimeout(function() {
          // show the modal and overlay
          dom.modal.classList.add('active-modal')
          dom.overlay.classList.add('active-overlay')
        }, 210)


      } else if (el.classList.value.split(' ')[0] === 'cancel') {
        // trigger the hiding animation
        dom.modal.classList.add('hide')
        dom.overlay.classList.add('overlayHide')

        setTimeout(function() {
          // hide the modal and overlay
          dom.modal.classList.remove('active-modal')
          dom.overlay.classList.remove('active-overlay')
        }, 210)

        // reset the input values
        resetModalInfo()
      }
    })
  })



  let modifiedTaskID
  events.on('getTaskID', (id) => {
    modifiedTaskID = id
  })

  
  dom.confirm.addEventListener('click', () => {
    // check for a title
    if ( !dom.modalTitle.value) {
      dom.alert.innerHTML = 'Please enter the task title'
      return 
    }
    // due dates are required for sorting the tasks
    if (!dom.modalDate.value) {
      dom.alert.innerHTML = 'Please add a due date'
      return
    }


    if (dom.confirm.textContent === 'Confirm') {
      events.emit('taskEditConfirmed', [new todo(dom.modalTitle.value, dom.modalDate.value, 
        dom.modalDescription.value, currentPriority, 'off', dom.location.value, false), modifiedTaskID])      
      dom.cancel.click()
      resetModalInfo()
      return
    }

    
    // create new ToDo object and emit it, reset the modal and close it
    const NewTodo = new todo(dom.modalTitle.value, dom.modalDate.value, dom.modalDescription.value, currentPriority, 'off', dom.location.value, false)
    dom.cancel.click()
    resetModalInfo()
    events.emit('newValidTask', NewTodo)
  })

  dom.priorityBtns.forEach(el => el.addEventListener('click', () => {
    
    dom.priorityBtns.forEach(btn => {
      btn.classList.remove('active-selection')
    })

    el.classList.add('active-selection')
  }))
  
  function resetModalInfo() {
    dom.modalTitle.value = ''
    dom.modalDescription.value = ''
    currentPriority = 'lowP'
    dom.alert.innerHTML = ''
    dom.modalDate.value = format(new Date, "yyyy-MM-dd")
    dom.confirm.textContent = 'Add Task'
    dom.lowP.click()
  }
})()