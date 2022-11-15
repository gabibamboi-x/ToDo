import { allTasks, updateStorage } from ".."
import events from "./events"
import { dom } from "./getDOM"

let taskEditID;


export function setComplete(box) {
  box.addEventListener('change', () => {
    dom.feedback.textContent = 'Task Completed'
    box.parentElement.querySelector('.bin').click()
  })
}


export function editTask(el) {
  taskEditID = el.parentElement.parentElement.classList[0]
  
  // emit the task id
  events.emit('getTaskID', Number(el.parentElement.parentElement.classList[0].replace('t', '')))

  dom.confirm.textContent = 'Confirm'
  
  let currTask;
  allTasks.forEach(task => {
    if (task.uniqueID === Number(el.parentElement.parentElement.classList[0].replace('t', ''))) {
      currTask = task
    }
  })

  dom.addTodo.click()
  dom.modalTitle.value = currTask.title
  dom.modalTitle.classList.add('ID' + currTask.uniqueID)
  dom.modalDescription.value = currTask.description
  dom.modalDate.value = currTask.dueDate
  dom.location.setAttribute('selected', 'selected') 
  document.querySelector('#' + currTask.priority).click()
}



events.on('taskEditConfirmed', (el) => {
  allTasks.forEach(task => {
    if (task.uniqueID === Number(el[1])) {
      task.title = el[0].title
      task.description = el[0].description
      task.dueDate = el[0].dueDate
      task.priority = el[0].priority
      task.projectName = el[0].projectName
      
      // update the storage with the new details
      updateStorage()
      
      location.reload()
      return false
    }
  })
})