import "./styles/main.css"
import "./styles/modal.css"
import "./styles/projects.css"

import "./modules/modal"
import "./modules/setComplete"
import "./modules/projects"
import "./modules/displayController"
import events from "./modules/events"
import {render} from "./modules/render"
import createTitleDOM from "./modules/createProject"




// get the tasks & projects from the storage
const getTasks = window.localStorage.getItem('storedTasks')
const getProjects = window.localStorage.getItem('storedProjects')
const storedTasks = JSON.parse(getTasks)
const storedProjects = JSON.parse(getProjects)

export const allProjects = []
export const allTasks = []
export let storageID = 141

// if there are items stored render them
if (storedProjects) {
  storedProjects.forEach(element => {
    createTitleDOM(element)
    allProjects.push(element)
  })
}

if (storedTasks) {
  storedTasks.forEach(element => {
    element.uniqueID = storageID
    render(element)
    allTasks.push(element)
    storageID++
  });
}

updateStorage()

// update with each new addition of tasks and projects
events.on('newProjectAdded', (p_title) => {
  createTitleDOM(p_title)

  // confirm the new project to the user
  document.querySelector('.feedback').innerText = 'Project added!'
  setTimeout(function() {
    document.querySelector('.feedback').innerText = ''
  }, 2000)

  updateStorage()
})


events.on('newValidTask', (NewTodo) => {
  NewTodo.uniqueID = storageID
  render(NewTodo)
  storageID++
  
  // confirm the new task to the user
  document.querySelector('.feedback').innerText = 'Task added!'
  setTimeout(function() {
    document.querySelector('.feedback').innerText = ''
  }, 2000)

  updateStorage()
})

function updateStorage(){
  // reset the storage and add the updated arrays
  window.localStorage.clear()
  window.localStorage.setItem('storedTasks', JSON.stringify(allTasks))
  window.localStorage.setItem('storedProjects', JSON.stringify(allProjects))
}