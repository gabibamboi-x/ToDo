import events from "./events"
import happyCat from "../Images/allDone.png"

document.querySelector('.home').addEventListener('click', () => {
  document.querySelector('.data-1').click()
})

// add the listeners to menu elements
updateMenuListeners()

let state = 'open'

export default function updateMenuListeners() {
  document.querySelectorAll('.menu-item').forEach(el => 
    el.addEventListener('click', () => {

      
      document.querySelectorAll('.tab').forEach(tab => {
        // checking for the first child
        if (!tab.firstChild) {
          
          createAllDoneStatus(tab)
          
          // check if there is a second child and hide the picture with the message if so
        } else if (tab.querySelector('.missingContent') && tab.children.length > 1) {
          tab.querySelector('.missingContent').classList.add('missingHide')
        } else if (tab.querySelector('.missingContent')) {
          tab.querySelector('.missingContent').classList.remove('missingHide')
        }
        
        // reset the active-tab
        tab.classList.remove('active-tab')
      })
      
      // reset the active menu item
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active-menu-item')
      })
      
      
      // add the active-tab to the clicked element
      const tabs = document.querySelector('.taskview')
      const currTab = tabs.querySelector('.' + el.classList.value.split(' ')[1])
      if (currTab) {
        currTab.classList.add('active-tab')
        // let the user know on which section he chose
        el.classList.add('active-menu-item')
      }
      
      if (innerWidth < 850) {
        state = 'open'
        document.querySelector('.menu-nav').click()
      }

      // update the tab title
      document.querySelector('.currentTab').innerText = el.querySelector('p').innerText
    })
  )
}


export function createAllDoneStatus(tab){
  // create the all done element if there is not first child
  const newMissing = document.createElement('div')
  newMissing.setAttribute('class', 'missingContent')

  const doneMessage = document.createElement('p')
  doneMessage.textContent = 'Nicely done, all tasks in this section have been completed!'

  const addNewTask = document.createElement('button')
  addNewTask.setAttribute('class', 'allDoneBtn')
  addNewTask.textContent = 'Add new task'

  addNewTask.addEventListener('click', () => {
  document.querySelector('.addTodo').click()
  })

  // set the picture
  const allDone = new Image
  allDone.src = happyCat

  newMissing.appendChild(allDone)
  newMissing.appendChild(doneMessage)
  newMissing.appendChild(addNewTask)

  // append it to the tab
  tab.appendChild(newMissing)
}



// select the new option when a project is deleted
events.on('sibling', (selection) => {
  setTimeout(function() {
    selection.click()
  }, 20)
})


// add the transition to the menu section
let paddingSize
let paddingNew
document.querySelector('.menu-nav').addEventListener('click', () => {
  
  const menu = document.querySelector('.menu')
  
  if (innerWidth < 850) {
    paddingSize = '25px'
    document.querySelector('.menu').style.position = 'absolute'
    paddingNew = '20px'
  } else {
    paddingSize = '50px'
    paddingNew = '350px'
  }

  if (state === 'open') {
    menu.classList.remove('open-menu')
    menu.classList.add('close-menu')
    document.querySelector('.main').style.paddingInline = paddingSize
    
    setTimeout(() => {
      menu.style.display = 'none'
    }, 400)

    state = 'closed'
    return
  }
  
  document.querySelector('.main').style.paddingLeft = paddingNew
  menu.classList.remove('close-menu')
  menu.style.display = 'block'
  menu.classList.add('open-menu')
  
  state = 'open'
})

window.addEventListener('resize', () => {
  if (innerWidth < 750) {
    state = 'open'
    document.querySelector('.menu-nav').click()
    document.querySelector('.main').style.paddingInline = '25px'
  }
})

window.addEventListener('DOMContentLoaded', () => {
  if (innerWidth < 850) {
    state = 'open'
    document.querySelector('.menu-nav').click()
    document.querySelector('.main').style.paddingInline = '25px'
    return
  } 

  if (!document.querySelector('.allContent').firstChild) {
    createAllDoneStatus(document.querySelector('.allContent'))
  }
})


document.querySelectorAll('.check').forEach(check => {
  check.addEventListener('check', () => {
    // TODO
  })
})

