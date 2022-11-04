document.querySelectorAll('.menu-item').forEach(el => 
  el.addEventListener('click', () => {
    // reset the active-tab
    document.querySelectorAll('.tab').forEach(tab => 
      tab.classList.remove('active-tab')
    )

    // add the active-tab to the clicked element
    const tabs = document.querySelector('.taskview')
    tabs.querySelector('.' + el.classList.value.split(' ')[1]).classList.add('active-tab')
    
    // update the tab title
    document.querySelector('.currentTab').innerText = el.querySelector('p').innerText
  })
)



