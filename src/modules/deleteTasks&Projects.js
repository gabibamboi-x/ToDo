import { allProjects, allTasks } from ".."
import { updateStorage } from "../index"
import events from "./events";

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



  // delete the projects
  document.querySelectorAll('.binProject').forEach(el => {

    el.addEventListener('click', () => {

      const currentProject = el.parentElement.classList[2]

      allProjects.forEach(element => {
        if (element.id.toString() === currentProject.replace('p', '')) {
          
          // remove the associated task 
          allTasks.forEach(task => {
            if (task.projectName === element.title) {
              allTasks.splice(allTasks.indexOf(task), 1)
            }
          })
          
          // remove the project
          allProjects.splice(allProjects.indexOf(element), 1)


          // get the class data-n and then it's next sibling if possible,
          // previous if not and if there is only one project left the user will be redirected 
          // to all tasks section
          const currentElement = el.parentElement.classList[1]

          if (document.querySelector('.' + currentElement).nextSibling) {
            events.emit('sibling', document.querySelector('.' + currentElement).nextSibling)
          } else if (document.querySelector('.' + currentElement).previousElementSibling) {
            events.emit('sibling', document.querySelector('.' + currentElement).previousElementSibling)
          } else {
            events.emit('sibling', document.querySelector('.home'))
          }
          
          // remove the project's elements from the DOM
          document.querySelectorAll('.' + currentProject).forEach(el => {
            el.remove()
          })
          
          // confirm the deleted task to the user for 2 seconds
          document.querySelector('.feedback').innerText = 'Project deleted'
          setTimeout(function() {
            document.querySelector('.feedback').innerText = ''
          }, 2000)
          
          // update the storage
          updateStorage()
        }
      })
    })
  })
})