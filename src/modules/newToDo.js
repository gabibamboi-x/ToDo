import events from "./events"

class todo {
  constructor(title, dueDate = 'no due date', description, priority, checked) {
    this.title = title,
    this.dueDate = dueDate,
    this.description = description,
    this.priority = priority,
    this.checked = checked
  }
}

// add todo to the DOM
(() => {
  const addTodoBtn = document.querySelector('.addTodo')
  const modal = document.querySelector('.modal-wrapper')
  const closeModal = document.querySelector('.cancel')

  addTodoBtn.addEventListener('click', () => {
    modal.classList.add('show')
    modal.classList.remove('hide')
    setTimeout(function() {
      modal.style.display = "block"
    }, 150);
  }, false)

  closeModal.addEventListener('click', () => {
    modal.classList.remove('show')
    modal.classList.add('hide')
    setTimeout(function() {
      modal.style.display = "none"
    }, 210);
  }, false)

})()