import events from "./events"
import { allProjects, projectID } from "../index"

const newProjectDiv = document.querySelector('.addNewProject')

// display the input for a new project name
document.querySelector('.newProject').addEventListener('click', () => {
  newProjectDiv.classList.remove('hideNewProject')
  newProjectDiv.classList.add('showNewProject')
})

// close the input if the user changes his mind
document.querySelector('.cancelNewProject').addEventListener('click', () => {
  newProjectDiv.classList.add('hideNewProject')

  // add a delay to allow the animation to play
  setTimeout( function() {
    newProjectDiv.querySelector('.newProjectInput').value = ''
    newProjectDiv.classList.remove('showNewProject')
  }, 200)

  })

// remove the alert on focus
document.querySelector('.newProjectInput').addEventListener('focus', () => {
  document.querySelector('.no-pr-title').innerText = ''
})


document.querySelector('.confirmNewProject').addEventListener('click', () => {
  // get the input value
  const newProject = {}
  newProject.title = newProjectDiv.querySelector('.newProjectInput').value
  newProject.id = projectID

  // show an alert if there is no title and return
  if (!newProject.title) {
    document.querySelector('.no-pr-title').innerText = 'Project Name Required'
    return
  } else if (newProject.title.split('').length > 18) {
    document.querySelector('.no-pr-title').innerText = 'Name too long'
    return
  }

  // push and emit the new title
  // use regex for the id's in the DOM
  allProjects.push(newProject)
  events.emit('newProjectAdded', newProject)

  // close the input section
  document.querySelector('.cancelNewProject').click()
})


let status = 'collapsed'
document.querySelector('.expand-projects').addEventListener('click', () => {

  const expand_btn = document.querySelector('.expand-projects')
  const projects_list = document.querySelector('.allProjects')
  const allProjects = document.querySelector('.allProjects')
  
  if (status === 'collapsed') {
    allProjects.classList.add('showAllProjects')
    expand_btn.classList.remove('collapsed')    
    projects_list.classList.remove('hideProjects')
    expand_btn.classList.add('expanded')
    projects_list.classList.add('showProjects')
    status = 'expanded'
    return
  }

  allProjects.classList.remove('showAllProjects')
  expand_btn.classList.remove('expanded')
  expand_btn.classList.add('collapsed')
  projects_list.classList.remove('showProjects')
  projects_list.classList.add('hideProjects')

  document.querySelector('.cancelNewProject').click()
  status = 'collapsed'

})