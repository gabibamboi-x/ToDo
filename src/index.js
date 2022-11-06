import "./styles/main.css"
import "./styles/modal.css"
import "./styles/projects.css"

import "./modules/modal"
import "./modules/setComplete"
import "./modules/displayController"
import events from "./modules/events"
import {render} from "./modules/render"
import { allProjects } from "./modules/projects"
import { allTasks } from "./modules/createNewToDo"
import createTitleDOM from "./modules/createProject"

// initial render of the normal tasks and projects
allTasks.forEach(element => {
  render(element)
});

allProjects.forEach(element => {
  createTitleDOM(element)
})

// update with each new addition of tasks and projects
events.on('newProjectAdded', (p_title) => {
  allProjects.push(p_title)
  createTitleDOM(p_title)
})

events.on('newValidTask', (NewTodo) => {
  allTasks.push(NewTodo)
  render(NewTodo)
})