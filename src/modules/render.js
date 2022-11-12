import { intlFormatDistance } from "date-fns"
import { createTaskNode } from "./createNewTask"
import { allProjects } from ".."

export function render(el) {
  // check for the date and if a task should be put in the today section or upcoming
  const currentDistance = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' }).split(' ')

  if (el.projectName.toLowerCase() === 'inbox' ) {    

    if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
        currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
      hideStatus(document.querySelector('.upcomingContent'))
      document.querySelector('.upcomingContent').appendChild(createTaskNode(el))

    } else if (currentDistance[0] === 'today') {
      hideStatus(document.querySelector('.todayContent'))
      document.querySelector('.todayContent').appendChild(createTaskNode(el))
    }
    

    if (el.priority.slice(0, -1).toUpperCase() === 'HIGH') {
      document.querySelector('.importantContent')
      document.querySelector('.importantContent').appendChild(createTaskNode(el))
    }

    hideStatus(document.querySelector('.allContent'))
    document.querySelector('.allContent').appendChild(createTaskNode(el))

    return
  }

  // check if the task has a project name other than inbox
  allProjects.forEach(pr => {
    if (pr.title === el.projectName) {
      if (document.querySelector('.tab.p' + pr.id + ' .missingContent')) {
        document.querySelector('.tab.p' + pr.id + ' .missingContent').classList.add('missingHide')
      }
      document.querySelector('.tab.p' + pr.id).appendChild(createTaskNode(el))
      return
    }
  })

  function hideStatus(tabContent) {
    if(tabContent.querySelector('.missingContent')) {
      tabContent.querySelector('.missingContent').classList.add('missingHide')
    }
  }
};