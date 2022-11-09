import { intlFormatDistance } from "date-fns"
import { createTaskNode } from "./createNewToDo"
import { allProjects, allTasks, updateStorage } from ".."

export function render(el) {

  // check for the date and if a task should be put in the today section or upcoming
  const currentDistance = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' }).split(' ')

  if (el.projectName.toLowerCase() === 'inbox' ) {    

    if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
        currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
      document.querySelector('.upcomingContent').appendChild(createTaskNode(el))

    } else if (currentDistance[0] === 'today') {
      document.querySelector('.todayContent').appendChild(createTaskNode(el))
    }
    

    if (el.priority.slice(0, -1).toUpperCase() === 'HIGH') {
      document.querySelector('.importantContent').appendChild(createTaskNode(el))
    }


    document.querySelector('.allContent').appendChild(createTaskNode(el))
    return
  }

  // check if the task has a project name other than inbox
  allProjects.forEach(pr => {
    if (pr.title === el.projectName) {
      document.querySelector('.tab.p' + pr.id).appendChild(createTaskNode(el))
    }
  })


};