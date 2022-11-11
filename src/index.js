import "./styles/main.css"
import "./styles/modal.css"
import "./styles/projects.css"
import "./styles/checkbox.css"

import "./modules/modal"
import "./modules/projects"
import "./modules/delete"
import "./modules/editTask"
import "./modules/displayController"
import "./modules/createNewToDo"
import events from "./modules/events.js"
import {render} from "./modules/render.js"
import createTitleDOM from "./modules/createProject.js"


// get the tasks & projects from the storage
const getTasks = localStorage.getItem('storedTasks')
const getProjects = localStorage.getItem('storedProjects')
const storedTasks = JSON.parse(getTasks)
const storedProjects = JSON.parse(getProjects)


export const allProjects = []
export const allTasks = []
// create new IDs starting at 141 (why at 141 you may be asking? i don't know 1 seems to low for an id number)
export let taskID = 141
export let projectID = 141

// check if there are stored projects and/or tasks to avoid an error on the forEach loop if there aren't any
if (storedProjects) {
  console.log('d')
  // if there are projects in the localStorage their elements will be created
  for (let i = 0; i < storedProjects.length; i++) {
    storedProjects[i].id = projectID

    console.log(storedProjects[i])
    
    createTitleDOM(storedProjects[i])
    allProjects.push(storedProjects[i])
    projectID++
  }

}

if (storedTasks) {
  for (let i = 0; i < storedTasks.length; i++) {

    // give each element an id, when createTaskNode inside render will be executed 
    // a unique id will be assigned to the class of the specific task DOM element
    storedTasks[i].uniqueID = taskID
    render(storedTasks[i])

    // same as with the projects the task will be pushed to the initially empty array
    // and update the localStorage based on the new array 
    // (within this forEach every element from the storage will be added to the allTasks array
    // so nothing will be lost)
    allTasks.push(storedTasks[i])

    // increase the taskID here and on the events.on, basically with every new task the id increases
    taskID++
  }
}

// 

// update with each new addition of tasks and projects
events.on('newProjectAdded', (project) => {
  createTitleDOM(project)
  projectID++

  // confirm the new project to the user
  document.querySelector('.feedback').innerText = 'Project added!'

  setTimeout(function() {
    document.querySelector('.feedback').innerText = ''
  }, 2000)

  updateStorage()
  dispatchDOM()
})


events.on('newValidTask', (NewTodo) => {
  // assign an unique ID to the new task, see the rendering of storedTasks for details ↑
  NewTodo.uniqueID = taskID
  render(NewTodo)
  allTasks.push(NewTodo)
  taskID++
  
  // confirm the new task to the user for 2 seconds
  document.querySelector('.feedback').innerText = 'Task added!'
  setTimeout(function() {
    document.querySelector('.feedback').innerText = ''
  }, 2000)

  updateStorage()
  dispatchDOM()
})

export function updateStorage(){
  // reset the storage and add the updated arrays
  // much easier and less code than selecting individual items and update them
  window.localStorage.clear()
  window.localStorage.setItem('storedTasks', JSON.stringify(allTasks))
  window.localStorage.setItem('storedProjects', JSON.stringify(allProjects))
}

export function dispatchDOM(){
  window.document.dispatchEvent(new Event("DOMContentLoaded", {
    bubbles: true,
    cancelable: true
  }));
}