import { allTasks, updateStorage } from "..";
import events from "./events";

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.edit').forEach(el => {
    el.addEventListener('click', () => {

      // emit the task id
      events.emit('getTaskID', Number(el.parentElement.parentElement.classList[0].replace('t', '')))
      
      console.log(Number(el.parentElement.parentElement.classList[0].replace('t', '')))

      document.querySelector('.confirm').textContent = 'Confirm'
      
      let currTask;
      allTasks.forEach(task => {
        if (task.uniqueID === Number(el.parentElement.parentElement.classList[0].replace('t', ''))) {
          currTask = task
        }
      })

      console.log(currTask)
      document.querySelector('.addTodo').click()
      document.querySelector('#todotitle').value = currTask.title
      document.querySelector('#todotitle').classList.add('ID' + currTask.uniqueID)
      document.querySelector('#tododescription').value = currTask.description
      document.querySelector('#dueDate').value = currTask.dueDate
      document.querySelector('.location').setAttribute('selected', 'selected') 
      document.querySelector('#' + currTask.priority).click()
    })
  })
})

events.on('taskEditConfirmed', (el) => {
  allTasks.forEach(task => {
    if (task.uniqueID === Number(el[1])) {
      task.title = el[0].title
      task.description = el[0].description
      task.dueDate = el[0].dueDate
      task.priority = el[0].priority
      task.projectName = el[0].projectName
      task.uniqueID = Number(el[1])
      
      updateStorage()

      location.reload()
      return false;
  }})
})