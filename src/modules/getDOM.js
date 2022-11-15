
export const dom = (() => {
  return {
    home : document.querySelector('.home'),
    menu : document.querySelector('.menu-nav'),

    addTodo : document.querySelector('.addTodo'),
    menu_div : document.querySelector('.menu'),
    menu_items : document.querySelectorAll('.menu-item'),
    data1 : document.querySelector('.data-1'),

    main : document.querySelector('.main'),
    taskview : document.querySelector('.taskview'),

    allTasksMenu : document.querySelector('.alltasks'),
    todayMenu : document.querySelector('.today'),
    upcomingMenu : document.querySelector('.upcoming'),
    importantMenu : document.querySelector('.important'),
    newProject : document.querySelector('.newProject'),
    expand : document.querySelector('.expand-projects'),
    projectsList : document.querySelector('.orderedProjects'),

    location : document.querySelector('.location'),

    tabs : document.querySelectorAll('.tab'),
    currentTab : document.querySelector('.currentTab'),

    allTasksTab : document.querySelector('.allContent'),
    upcomingContent : document.querySelector('.upcomingContent'),
    todayContent : document.querySelector('.todayContent'),
    importantContent : document.querySelector('.importantContent'),

    modal : document.querySelector('.modal'),
    overlay : document.querySelector('.overlay'),
    modalTitle : document.querySelector('#todotitle'),
    modalDescription : document.querySelector('#tododescription'),
    modalDate : document.querySelector('#dueDate'),
    priorityBtns : document.querySelectorAll('.priorityBtn'),
    lowP : document.querySelector('#lowP'),
    confirm : document.querySelector('.confirm'),
    cancel : document.querySelector('.cancel'),
    sw : document.querySelectorAll('.sw'),
    alert : document.querySelector('.alert'),
    check : document.querySelector('.check'),

    feedback : document.querySelector('.feedback'),
    gitImg : document.querySelector('.git'),
  }
})()