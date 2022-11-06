export default function createTitleElements(p_title) {
  // create the option for the modal
  const newOption = document.createElement('option')
  newOption.setAttribute('value', p_title)
  newOption.innerText = p_title.replace(/_/g, ' ')

  // create the tab where all the tasks of one project will be shown
  const contentView = document.createElement('div')
  contentView.setAttribute('id', p_title)

  // append them to the DOM
  document.querySelector('.taskview').appendChild(contentView)
  document.querySelector('.location').appendChild(newOption)

  // give the user a confirmation
  document.querySelector('.feedback').innerText = 'Project added!'
    setTimeout(function() {
      document.querySelector('.feedback').innerText = ''
  }, 2000)
}