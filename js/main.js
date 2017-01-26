console.log("I am working!");
console.log("Still working!");

function handleClick () {
  $(this).text($(this).next().val());
}

function onBtnEnter () {
  $(this).css({'background-color': 'red'});
}

function onBtnExit () {
  $(this).css({'background-color': 'blue'});
}

$('#greeting').on('click', handleClick);

$('#greeting').on('mouseenter', onBtnEnter);
$('#greeting').on('mouseleave', onBtnExit);

function setupStorage() {
  if (!localStorage.toDos) {
    localStorage.toDos = JSON.stringify([]);
  }
  if (!localStorage.completeTodos) {
    localStorage.completeTodos = JSON.stringify([]);
  }
}

setupStorage();

function addTodoToStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  data.push(todo);
  localStorage.toDos = JSON.stringify(data);
}

function removeTodoFromStorage(todo) {
  var data = JSON.parse(localStorage.toDos);
  var new_data = data.filter(function (item) {
    return item.id != todo.id;
  })
  localStorage.toDos = JSON.stringify(new_data);
}

function clearStorage() {
  localStorage.toDos = JSON.stringify([]);
  localStorage.completeTodos = JSON.stringify([]);
}

// var todos = [
//   {id: Math.floor(Math.random()*100), name: 'JS Objects', date: '1/30/17', status:'Complete'},
//   {id: Math.floor(Math.random()*100), name: 'JS Constructors', date: '1/30/17', status:'Complete'},
//   {id: Math.floor(Math.random()*100), name: 'JQuery', date: '1/30/17', status:'Complete'},
//   {id: Math.floor(Math.random()*100), name: 'React', date: '1/30/17', status:'Complete'},
//   {id: Math.floor(Math.random()*100), name: 'React-Bootstrap', date: '1/30/17', status:'Complete'},
//   {id: Math.floor(Math.random()*100), name: 'ToDo app in React', date: '1/30/17', status:'Complete'},
// ];

// var completeTodos = [];

function buildTodoHtml(item, buttonId) {
  st = '<tr><td>' + item.name + '</td><td>' + item.date +
       '</td><td><span class="label label-danger">' +
       item.status + '</span></td><td><button ';
  st += buttonId? 'id="' + item.id + '"' : '';
  st += 'class="btn btn-primary complete-todo">Complete</button></td>';
  return st;
}

function renderToDos () {
  console.log(localStorage.toDos);
  console.log(localStorage.completeTodos);
  var data = JSON.parse(localStorage.toDos);
  if (data.length > 0) {
    data.forEach(function (element) {
      $("#tdbody").append(buildTodoHtml(element, true));
    });
  }
  var data = JSON.parse(localStorage.completeTodos);
  data.forEach(function (element) {
    $("#ctdbody").append(buildTodoHtml(element, false));
  });
}

renderToDos();

function markCompleted () {
  $(this).closest('tr').remove();

  var id = $(this).attr('id');
  console.log(id);
  var data = JSON.parse(localStorage.toDos);
  markedToDo = data.filter(function (item) {
    return item.id == id;
  });
  console.log(markedToDo);
  addToCompleted(markedToDo[0]);
}

function addToCompleted (todo) {
  removeTodoFromStorage(todo);
  var data = JSON.parse(localStorage.completeTodos);
  data.push(todo);
  localStorage.completeTodos = JSON.stringify(data);
  console.log(localStorage.completeTodos);
  $("#ctdbody").append(buildTodoHtml(todo, false));
}

$("#newTodoForm").submit(function (e) {
  e.preventDefault();
  var newToDo = {id: Math.floor(Math.random()*100),
                 name: $('#todoName').val(),
                 date: $('#todoDate').val(),
                 status: 'Complete'};
  addTodoToStorage(newToDo);
  console.log(newToDo);
  console.log(localStorage.toDos);
  $("#tdbody").append(buildTodoHtml(newToDo, true));
  $('.complete-todo').on('click', markCompleted);
})

$('.complete-todo').on('click', markCompleted);

$('#clrLS').on('click', clearStorage)
