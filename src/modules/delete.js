import { allProjects, allTasks } from ".."
import { updateStorage } from "../index"

window.addEventListener('DOMContentLoaded', () => {
  // delete the normal Tasks
  document.querySelectorAll('.bin').forEach(el => {
    el.addEventListener('click', () => {
      // getting the id of the task
      const currentTask = el.parentElement.parentElement.classList[0]
      allTasks.forEach(element => {
        if (element.uniqueID.toString() === currentTask.replace('t', '')) {
          // remove the task form the array
          allTasks.splice(allTasks.indexOf(element), 1)

          // remove all task related elements form the DOM
          document.querySelectorAll('.' + currentTask).forEach(el => {
            el.remove()
          })

          // confirm the deleted task to the user for 2 seconds
          document.querySelector('.feedback').innerText = 'Task deleted'
          setTimeout(function() {
            document.querySelector('.feedback').innerText = ''
          }, 2000)

          updateStorage()
        }
      })
    })
  })

  // delete the normal Tasks
  document.querySelectorAll('.binProject').forEach(el => {
    el.addEventListener('click', () => {
      const currentProject = el.parentElement.classList[2]
      allProjects.forEach(element => {
        if (element.id.toString() === currentProject.replace('p', '')) {
          // remove the project form the array
          allTasks.forEach(task => {
            if (task.projectName === element.title) {
              allTasks.splice(allTasks.indexOf(task), 1)
              updateStorage()
            }
          })

          allProjects.splice(allProjects.indexOf(element), 1)

          document.querySelectorAll('.' + currentProject).forEach(el => {
            el.remove()
          })

          document.querySelector('.home').click()

          // confirm the deleted task to the user for 2 seconds
          document.querySelector('.feedback').innerText = 'Task deleted'
          setTimeout(function() {
            document.querySelector('.feedback').innerText = ''
          }, 2000)

          updateStorage()
        }
      })
    })
  })
})