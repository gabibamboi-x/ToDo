document.querySelector('.home').addEventListener('click', () => {
  document.querySelector('.data-1').click()
})

updateMenuListeners()

export default function updateMenuListeners() {
  document.querySelectorAll('.menu-item').forEach(el => 
    el.addEventListener('click', () => {
      // reset the active-tab
      document.querySelectorAll('.tab').forEach(tab => { 
        tab.classList.remove('active-tab')
      })

      // add the active-tab to the clicked element
      const tabs = document.querySelector('.taskview')
      const currTab = tabs.querySelector('.' + el.classList.value.split(' ')[1])
      if (currTab) {
       currTab.classList.add('active-tab') 
      }
      
      // update the tab title
      document.querySelector('.currentTab').innerText = el.querySelector('p').innerText
    })
  )
}

let state = 'open'
document.querySelector('.menu-nav').addEventListener('click', () => {
  
  const menu = document.querySelector('.menu')
  
  if (state === 'open') {
    menu.classList.remove('open-menu')
    menu.classList.add('close-menu')
    document.querySelector('.main').style.paddingLeft = '50px'
    
    setTimeout(() => {
      menu.style.display = 'none'
    }, 400)

    state = 'closed'
    return
  }
  
  document.querySelector('.main').style.paddingLeft = '350px'
  menu.classList.remove('close-menu')
  menu.style.display = 'block'
  menu.classList.add('open-menu')
  
  state = 'open'
})



