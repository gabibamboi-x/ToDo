import events from "./events"
import happyCat from "../Images/allDone.png"
import { dom } from "./getDOM"





dom.home.addEventListener('click', () => {
  dom.data1.click()
})





let state = 'open'

export function addMenuListener(el) {
  el.addEventListener('click', () => {

    document.querySelectorAll('.tab').forEach(tab => {
      // reset the active-tab
      tab.classList.remove('active-tab')

      // checking for the first child
      if (!tab.firstChild) {
        
        createAllDoneStatus(tab)
        
        // check if there is a second child and hide the picture with the message if so
      } else if (tab.querySelector('.missingContent') && tab.children.length > 1) {

        tab.querySelector('.missingContent').classList.add('missingHide')

      } else if (tab.querySelector('.missingContent')) {

        tab.querySelector('.missingContent').classList.remove('missingHide')

      }
    })
    
    // reset the active menu item
    document.querySelectorAll('.menu-items').forEach(item => {
      item.classList.remove('active-menu-item')
    })
    
    
    // add the active-tab to the clicked element
    const currTab = dom.taskview.querySelector('.' + el.classList.value.split(' ')[1])
    if (currTab) {
      currTab.classList.add('active-tab')
      // let the user know on which section he chose
      el.classList.add('active-menu-item')
    }
    
    if (innerWidth < 850) {
      state = 'open'
      dom.menu.click()
    }
    
    // update the tab title
    dom.currentTab.innerText = el.querySelector('p').innerText
  })
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
    dom.addTodo.click()
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

dom.menu.addEventListener('click', () => {
  
  if (innerWidth < 850) {
    // for tablets and mobile devices the padding is less
    // and the menu position is set to absolute to avoid 
    // pushing the content div to much towards right
    paddingSize = '25px'
    dom.menu_div.style.position = 'absolute'
    paddingNew = '20px'
  } else {
    paddingSize = '80px'
    paddingNew = '380px'
  }

  // using the state variable we set the button's action
  // if open we close the menu and return
  if (state === 'open') {
    dom.menu_div.classList.remove('open-menu')
    dom.menu_div.classList.add('close-menu')
    dom.main.style.paddingInline = paddingSize
    
    setTimeout(() => {
      dom.menu_div.style.display = 'none'
    }, 400)

    state = 'closed'
    return
  }
  
  // we open the menu if the state is on closed
  dom.main.style.paddingLeft = paddingNew
  dom.menu_div.classList.remove('close-menu')
  dom.menu_div.style.display = 'block'
  dom.menu_div.classList.add('open-menu')
  
  state = 'open'
})

// the menu will automatically close and open on resizing the window
// based on the width
window.addEventListener('resize', () => {
  if (innerWidth < 750) {
    state = 'open'
    dom.menu.click()
    dom.main.style.paddingInline = '25px'
  } else {
    state = 'closed'
    dom.menu.click()
  }
})


window.addEventListener('DOMContentLoaded', () => {
  // set the padding if loaded directly on a smaller screen
  if (innerWidth < 850) {
    state = 'open'
    dom.menu.click()
    dom.main.style.paddingInline = '25px'
  } 
})
