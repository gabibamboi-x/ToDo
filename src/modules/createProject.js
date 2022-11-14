import { allProjects } from "../index"
import updateMenuListeners from "./displayController"
import bin from "../Images/bin.png"

export default function createTitleElements(project) {

  // create the title list for the menu
  const newLi = document.createElement('li')
  const title = document.createElement('p')

  // removing the underscore for the menu option on-screen
  title.innerText = project.title.replace(/_/g, ' ')

  // setting the same classes as the main menu options to work with the tab switching function
  // also adding the project id, it will help with deleting the element when the project is deleted
  newLi.setAttribute('class', 'menu-item data-' + 
    (allProjects.length + 6) + ' p' + project.id)
  newLi.appendChild(title)
  

  // add the bin image to the menu div
  const binIcn = new Image
  binIcn.src = bin
  binIcn.setAttribute('class', 'binProject')
  newLi.appendChild(binIcn)
  
  // create the option for the modal
  const newOption = document.createElement('option')
  // again, the project id will be added to help removing the element when it is deleted
  newOption.setAttribute('value', project.title)
  newOption.setAttribute('class', ' p' + project.id)
  newOption.innerText = project.title.replace(/_/g, ' ')
  
  // create the tab where all the tasks of one project will be shown
  const contentView = document.createElement('div')
  contentView.setAttribute('class', 'tab data-' + (allProjects.length + 6) + ' projectContent' + ' p' + project.id)

  // append them to the DOM
  document.querySelector('.orderedProjects').appendChild(newLi)
  document.querySelector('.taskview').appendChild(contentView)
  document.querySelector('.location').appendChild(newOption)

  // call the updateMenuListeners to add listeners to the new projects menu options
  updateMenuListeners()
}