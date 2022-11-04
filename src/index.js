import "./modules/modal"
import "./modules/setComplete"
import "./styles/main.css"
import "./styles/modal.css"
import events from "./modules/events"
import {render} from "./modules/render"
import "./modules/displayController"
import { allTasks } from "./modules/createNewToDo"

// initial render
allTasks.forEach(element => {
  render(element)
});

events.on('newValidTask', (NewTodo) => {
  allTasks.push(NewTodo)
  render(NewTodo)
  console.log(allTasks)
})