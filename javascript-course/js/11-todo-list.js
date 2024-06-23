const toDoList = [
  {
    name: '',
    dueDate: ''
  }
];

let counter = 0

function addTask()
{
  let toDoListDiv = document.querySelector('.js-toDoList')
  let html = '';
  toDoList.forEach(function(x, i){
    const {name, dueDate} = x;
    html += `
      <div> ${name} </div>
      <div> ${dueDate} </div>
      <button onclick="
        deleteTask(${i})"
        class = "css-deleteButton"
      >Delete</button>
    `; 
  }); 
  toDoListDiv.innerHTML = html;
}


function deleteTask(i) {
  toDoList.splice(i, 1);
  addTask(); 
  counter--; 
}
  
function addToDo()
{
  const inputElement = 
    document.querySelector('.js-name-input');
  const dueDateInput = 
    document.querySelector('.js-dueDate-input');

    let name = inputElement.value, date = dueDateInput.value;

    const newtoDoList = {
      name: name,
      dueDate: date
    };

    toDoList[counter] = newtoDoList

  inputElement.value = '';
  dueDateInput.value = '';
  counter++;
}

function onKeyDown()
{
  if(event.key === 'Enter')
    {
      addToDo();
      addTask();
    }
}




