import { intlFormatDistance } from "date-fns"
import { createTaskNode } from "./createNewTask"
import { allProjects } from ".."
import { dom } from "./getDOM"
import { editTask, setComplete } from "./editTask"
import { deleteTask } from "./deleteTasks&Projects"

export function render(el) {
  // check for the date and if a task should be put in the today section or upcoming
  const currentDistance = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' }).split(' ')

  if (el.projectName.toLowerCase() === 'inbox' ) {    

    // check if the task date is in the next 7 days
    if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
        currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
      hideStatus(dom.upcomingContent)
      dom.upcomingContent.appendChild(createTaskNode(el))

      // check for today
    } else if (currentDistance[0] === 'today') {
      hideStatus(dom.todayContent)
      dom.todayContent.appendChild(createTaskNode(el))
    }
    
    // based on th task's priority, if it's high it's added to the important section
    if (el.priority.slice(0, -1).toUpperCase() === 'HIGH') {
      hideStatus(dom.importantContent)
      dom.importantContent.appendChild(createTaskNode(el))
    }

    hideStatus(dom.allTasksTab)
    dom.allTasksTab.appendChild(createTaskNode(el))

    const tasks = document.querySelectorAll('.t' + el.uniqueID)
    // add the event listeners for touch also
    tasks.forEach(task => {
      task.querySelector('.edit').addEventListener('click', function() {
        editTask(task.querySelector('.edit'))
      })

      task.querySelector('.check').addEventListener('click', function() {
        setComplete(task.querySelector('.check'))
      })

      task.querySelector('.bin').addEventListener('click', function() {
        deleteTask(task.querySelector('.bin'))
      })

      task.querySelector('.edit').addEventListener('ontouchstart', function() {
        editTask(task.querySelector('.edit'))
      })

      task.querySelector('.check').addEventListener('ontouchstart', function() {
        setComplete(task.querySelector('.check'))
      })

      task.querySelector('.bin').addEventListener('ontouchstart', function() {
        deleteTask(task.querySelector('.bin'))
      })
    })

    return
  }

  // check if the task has a project name other than inbox
  allProjects.forEach(pr => {
    if (pr.title === el.projectName) {

      if (document.querySelector('.tab.p' + pr.id + ' .missingContent')) {
        document.querySelector('.tab.p' + pr.id + ' .missingContent').classList.add('missingHide')
      }

      document.querySelector('.tab.p' + pr.id).appendChild(createTaskNode(el))


      const pTask = document.querySelector('.t' + el.uniqueID)

      pTask.querySelector('.edit').addEventListener('click', function() {
        editTask(pTask.querySelector('.edit'))
      })

      pTask.querySelector('.check').addEventListener('click', function() {
        setComplete(pTask.querySelector('.check'))
      })

      pTask.querySelector('.bin').addEventListener( 'click' , function() {
        deleteTask(pTask.querySelector('.bin'))
      })

      pTask.querySelector('.edit').addEventListener('ontouchstart', function() {
        editTask(pTask.querySelector('.edit'))
      })

      pTask.querySelector('.check').addEventListener('ontouchstart', function() {
        setComplete(pTask.querySelector('.check'))
      })

      pTask.querySelector('.bin').addEventListener( 'ontouchstart' , function() {
        deleteTask(pTask.querySelector('.bin'))
      })

      return
    }
  })

  // hide the status when a new task is added
  function hideStatus(tabContent) {
    if(tabContent.querySelector('.missingContent')) {
      tabContent.querySelector('.missingContent').classList.add('missingHide')
    }
  }
};