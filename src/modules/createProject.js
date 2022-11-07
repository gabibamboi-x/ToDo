import { allProjects } from "../index"
import updateMenuListeners from "./displayController"

export default function createTitleElements(p_title) {
  // create the title list for the menu
  const newLi = document.createElement('li')
  const title = document.createElement('p')
  title.innerText = p_title
  newLi.setAttribute('class', 'menu-item data-' + 
    (allProjects.length + 6))
  newLi.appendChild(title)
  
  // create the option for the modal
  const newOption = document.createElement('option')
  newOption.setAttribute('value', p_title)
  newOption.innerText = p_title.replace(/_/g, ' ')
  
  // create the tab where all the tasks of one project will be shown
  const contentView = document.createElement('div')
  contentView.setAttribute('id', p_title)
  contentView.setAttribute('class', 'tab data-' + (allProjects.length + 6) + ' projectContent')
  
  // append them to the DOM
  document.querySelector('.orderedProjects').appendChild(newLi)
  document.querySelector('.taskview').appendChild(contentView)
  document.querySelector('.location').appendChild(newOption)

  updateMenuListeners()
}