// get the menu options
const allTasksSelection = document.querySelector('.alltasks')
const todaySelection = document.querySelector('.today')
const upcomingSelection = document.querySelector('.upcoming')
const importantSelection = document.querySelector('.important')

// get the sorted tasks div
const allContent = document.querySelector('.allContent')
const todayContent = document.querySelector('.todayContent')
const upcomingContent = document.querySelector('.upcomingContent')
const importantContent = document.querySelector('.importantContent')

const currentTab = document.querySelector('.currentTab')

// handle the tab-switching logic
allTasksSelection.addEventListener('click', () => {
  [todayContent, upcomingContent, importantContent].forEach(el => {
    el.style.display = 'none'
  })
  allContent.style.display = 'block'
  currentTab.textContent = 'All Tasks'
})

todaySelection.addEventListener('click', () => {
  [allContent, upcomingContent, importantContent].forEach(el => {
    el.style.display = 'none'
  })
  todayContent.style.display = 'block'
  currentTab.textContent = 'Today'
})

upcomingSelection.addEventListener('click', () => {
  [allContent, todayContent, importantContent].forEach(el => {
    el.style.display = 'none'
  })
  upcomingContent.style.display = 'block'
  currentTab.textContent = 'Upcoming'
})

importantSelection.addEventListener('click', () => {
  [allContent, upcomingContent, todayContent].forEach(el => {
    el.style.display = 'none'
  })
  importantContent.style.display = 'block'
  currentTab.textContent = 'Important!'
})
