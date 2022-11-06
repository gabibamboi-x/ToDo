import events from "./events"

export const allProjects = [] 

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
  }, 300)
})

// remove the alert on focus
document.querySelector('.newProjectInput').addEventListener('focus', () => {
  document.querySelector('.no-pr-title').innerText = ''
})


document.querySelector('.confirmNewProject').addEventListener('click', () => {
  // get the input value
  const p_title = newProjectDiv.querySelector('.newProjectInput').value

  // show an alert if there is no title and return
  if (!p_title) {
    document.querySelector('.no-pr-title').innerText = 'Project Name Required'
    return
  }

  // push and emit the new title
  // use regex for the id's in the DOM
  allProjects.push(p_title.replace(/\s/g, '_'))
  events.emit('newProjectAdded', p_title.replace(/\s/g, '_'))

  // close the input section
  document.querySelector('.cancelNewProject').click()
})


let status = 'collapsed'
document.querySelector('.expand-projects').addEventListener('click', () => {

  const expand_btn = document.querySelector('.expand-projects')
  const projects_list = document.querySelector('.allProjects')
  
  if (status === 'collapsed') {
    expand_btn.classList.remove('collapsed')    
    projects_list.classList.remove('hideProjects')
    expand_btn.classList.add('expanded')
    projects_list.classList.add('showProjects')
    status = 'expanded'
    return
  }

  expand_btn.classList.remove('expanded')
  expand_btn.classList.add('collapsed')
  projects_list.classList.remove('showProjects')
  projects_list.classList.add('hideProjects')

  document.querySelector('.cancelNewProject').click()
  status = 'collapsed'

})