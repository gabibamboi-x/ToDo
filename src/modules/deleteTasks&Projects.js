import { allProjects, allTasks } from ".."
import { updateStorage } from "../index"
import { createAllDoneStatus } from "./displayController";
import events from "./events";
import { dom } from "./getDOM";





export function deleteTask(el) {
      // getting the id of the task
  const currentTask = el.parentElement.parentElement.classList[0]

  // add the shrinking animation
  console.log(currentTask)
  el.parentElement.parentElement.classList.add('remove-task')

  // let the animation play then delete the tasks
  setTimeout( () => {
    allTasks.forEach(element => {
      if (element.uniqueID.toString() === currentTask.replace('t', '')) {
        
        // remove the task form the array
        allTasks.splice(allTasks.indexOf(element), 1)
        
        // remove all task related elements form the DOM
        document.querySelectorAll('.' + currentTask).forEach(e => {
          
          // if there are no more siblings show the all done status
          if (e.parentElement.childElementCount === 1 && !e.parentElement.querySelector('.missingContent')) {
            createAllDoneStatus(e.parentElement)
          } else if (e.parentElement.querySelector('.missingContent') && e.parentElement.childElementCount === 2) {
            e.parentElement.querySelector('.missingContent').classList.remove('missingHide')
          }

          e.remove()

        })
        
        
        // confirm the deleted task to the user for 2 seconds
        dom.feedback.innerText = 'Task Removed'
        setTimeout(function() {
          dom.feedback.innerText = ''
        }, 1000)
        
        updateStorage()
      }
    })
  }, 750)
}





// delete the projects
export function deleteProject (el) {
  // get the project id from it's class
  const currentProject = el.parentElement.classList[2]
  console.log('dd')
  
  allProjects.forEach(element => {
    if (element.id.toString() === currentProject.replace('p', '')) {
      
      // remove the associated task 
      allTasks.forEach(task => {
        // remove all tasks with the project name
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
      

      // auto-select next sibling or previous when a project is deleted
      const currentElementNode = document.querySelector('.' + currentElement)

      if (currentElementNode.nextSibling) {

        events.emit('sibling', currentElementNode.nextSibling)

      } else if (currentElementNode.previousElementSibling) {

        events.emit('sibling', currentElementNode.previousElementSibling)

      } else {

        events.emit('sibling', dom.home)

      }
    
      // remove the project's elements from the DOM
      document.querySelectorAll('.' + currentProject).forEach(el => {
        el.remove()
      })

      
      // confirm the deleted task to the user for 2 seconds
      dom.feedback.innerText = 'Project Deleted'
      setTimeout(function() {
        dom.feedback.innerText = ''
      }, 2000)
      
      // update the storage
      updateStorage()
    }
  })
}