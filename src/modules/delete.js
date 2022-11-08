import { allTasks } from ".."
import { updateStorage } from "../index"

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bin').forEach(el => {
    console.log('hi')
    el.addEventListener('click', () => {
      const currentTask = el.parentElement.parentElement.classList[0]
      allTasks.forEach(element => {
        if (element.uniqueID.toString() === currentTask.replace('t', '')) {
          allTasks.splice(allTasks.indexOf(element), 1)

          document.querySelectorAll('.' + currentTask).forEach(el => {
            el.remove()
          })

          // confirm the deleted task to the user for 2 seconds
          document.querySelector('.feedback').innerText = 'Task deleted'
          setTimeout(function() {
            document.querySelector('.feedback').innerText = ''
          }, 2000)

          updateStorage()
        }
      })
    })
  })
})