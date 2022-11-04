import { intlFormatDistance } from "date-fns"
import {allTasks, createTaskNode } from "./createNewToDo"

export function render(el) {
    // check for the date and if a task should be put in the today section or upcoming
    const currentDistance = intlFormatDistance(new Date(el.dueDate), new Date, { unit: 'day' }).split(' ')

    el.index = allTasks.indexOf(el)
    el.overdue = false

    if((currentDistance[0] === 'in' && currentDistance[1] > 0 && 
    currentDistance[1] < 8 && currentDistance[2] === 'days') || currentDistance[0] === 'tomorrow') {
      document.querySelector('.upcomingContent').appendChild(createTaskNode(el))
    } else if (currentDistance[0] === 'yesterday' || currentDistance[2] === 'ago') {
      el.overdue = true
    } else {
      document.querySelector('.todayContent').appendChild(createTaskNode(el))
    }
    
    if (el.priority.slice(0, -1).toUpperCase() === 'HIGH') {
      document.querySelector('.importantContent').appendChild(createTaskNode(el))
    }

    document.querySelector('.allContent').appendChild(createTaskNode(el))
};