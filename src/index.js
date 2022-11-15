import "./styles/main.css"
import "./styles/modal.css"
import "./styles/projects.css"
import "./styles/checkbox.css"
import "./styles/responsive.css"

import "./modules/getDOM"
import "./modules/modal"
import "./modules/projects"
import "./modules/deleteTasks&Projects"
import "./modules/editTask"
import "./modules/displayController"
import "./modules/createNewTask"
import "./modules/addImages"
import events from "./modules/events.js"
import {render} from "./modules/render.js"
import { dom } from "./modules/getDOM"
import { addMenuListener, createAllDoneStatus } from "./modules/displayController"
import createTitleDOM from "./modules/createProject.js"
import { deleteProject } from "./modules/deleteTasks&Projects"


createAllDoneStatus(dom.allTasksTab)

// get the tasks & projects from the storage
const storedTasks = JSON.parse(localStorage.getItem('storedTasks'))
const storedProjects = JSON.parse(localStorage.getItem('storedProjects'))

// create new IDs starting at 141 (why at 141 you may be asking? i don't know 1 seems to low for an id number)
export const allProjects = []
export const allTasks = []

export let taskID = 141
export let projectID = 141


// check if there are stored projects and/or tasks to avoid an error on the forEach loop if there aren't any
if (storedProjects) {
  // if there are projects in the localStorage their elements will be created
  for (let i = 0; i < storedProjects.length; i++) {
    // give each project an unique id
    storedProjects[i].id = projectID
    
    // create the elements needed for the project
    createTitleDOM(storedProjects[i])
    
    // add the delete event listener
    const pDiv = document.querySelector('.p' + projectID.toString())
    addMenuListener(pDiv)
  
    const currentIcon = pDiv.querySelector('.binProject')
    currentIcon.addEventListener( 'click' , function () {
      deleteProject(currentIcon)
    })

    // push them to the array that will be needed for updating the storage
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




// update with each new addition of tasks and projects
events.on('newProjectAdded', (project) => {
  // create the new project and increase the projectID
  createTitleDOM(project)

  const pDiv = document.querySelector('.p' + projectID.toString())
  addMenuListener(pDiv)

  const currentIcon = pDiv.querySelector('.binProject')
  currentIcon.addEventListener( 'click' , function () {
    deleteProject(currentIcon)
  })

  projectID++

  // confirm the new project to the user
  dom.feedback.innerText = 'Project added!'
  setTimeout(function() {
    dom.feedback.innerText = ''
  }, 2000)

  // dispatch DOM to bind the event listener to the new project selection
  updateStorage()
})




events.on('newValidTask', (NewTodo) => {
  // assign an unique ID to the new task, see the rendering of storedTasks for details ↑
  NewTodo.uniqueID = taskID
  // render the task
  render(NewTodo)
  taskID++
  
  allTasks.push(NewTodo)
  updateStorage()
  
  // confirm the new task to the user for 2 seconds
  dom.feedback.innerText = 'Task added!'
  setTimeout(function() {
    dom.feedback.innerText = ''
  }, 2000)
})



// add the menu switching logic to the menu options
dom.menu_items.forEach(item => {
  addMenuListener(item)
})




export function updateStorage(){
  // reset the storage and add the updated arrays
  // much easier and less code than selecting individual items and update them
  window.localStorage.clear()
  window.localStorage.setItem('storedTasks', JSON.stringify(allTasks))
  window.localStorage.setItem('storedProjects', JSON.stringify(allProjects))
}