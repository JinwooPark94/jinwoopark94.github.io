var todos = [ { id: 0, content : 'HTML', completed : true },
              { id: 1, content : 'CSS', completed: false },
              { id: 2, content : 'Javascript', completed: true },
              { id: 3, content : 'JSON', completed : true},
              { id: 4, content: 'Ajax', completed: false }];

var todoUl = document.querySelector('#todo-list');
var inputTodo = document.querySelector('#input-todo');
var buttonAll = document.querySelector('#button-todo');
var completeAll = document.querySelector('#count-all');
var selectTodo = document.querySelector('#select-todo');
var searchTodo = document.querySelector('#search-todo');

window.addEventListener('load', function () {
  loadData();
});

searchTodo.addEventListener('keyup', function (event) {
  loadData('search');
});

inputTodo.addEventListener('keyup', function (event) {
  if (!event.target.value) return;
  if (event.keyCode === 13) {
    addTodo(event);
    loadData();
  }
});

todoUl.addEventListener('click', function (event) {
  if (event.target.parentNode.nodeName === 'A') {
    deleteTodo(event);
    loadData();
  }
  if (event.target.nodeName === 'INPUT') {
    chkChange(event);
    if (selectTodo.value === 'comple') {
      loadData('comple');
    } else if ( selectTodo.value === 'uncomple' ) {
      loadData('uncomple');
    } else {
      loadData();
    }
  }
});

buttonAll.addEventListener('click', function(){
  checkAll();
  loadData();
});

selectTodo.addEventListener('click', function (event) {
  loadData(event.target.value);
});

// 전체 선택 및 전체 해제
function checkAll(){
  if (countComplete() !== todos.length) {
    todos.forEach(function (item) {
      return item.completed = true;
    });
  } else {
    todos.forEach(function (item) {
      return item.completed = false;
    });
  }
}

// 완료된 할일 수 반환
function countComplete(){
  var completCount = 0;

  todos.forEach(function (item) {
    if (item.completed === true) completCount++;
  });

  return completCount;
}

// 데이터 로드
function loadData(filter){
  var messageTodo = document.querySelector('#message-todo');
  var todoInner = '';
  var arrayName;

  // 완료 상태
  if (filter === 'comple') {
    arrayName = todos.filter( function (item) {
      return item.completed === true;
    });
    selectTodo.value = 'comple';

    // 미완료 상태
  } else if (filter === 'uncomple') {
    arrayName = todos.filter(function (item) {
      return item.completed === false;
    });
    selectTodo.value = 'uncomple';

    // 자동 검색
  } else if (filter === 'search') {
    arrayName = todos.filter( function (item){
      return (item.content.toLowerCase().match(searchTodo.value.toLowerCase())) ? true : false;
    });
    if (!searchTodo.value) arrayName = todos;

  } else {
    arrayName = todos;
    selectTodo.value = 'all';
  }

  console.log(arrayName.length);
  (!arrayName.length) ? messageTodo.style.display = 'block' : messageTodo.style.display = 'none';

  // 리스트 목록 출력
  arrayName.map(function (item) {
    var checkId = (item.completed) ? 'checked' : '';

    todoInner += '<li class="list-group-item">';
    todoInner += '<div class="hover-anchor">';
    todoInner += '<a class="hover-action text-muted">';
    todoInner += '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + item.id +'"></span>';
    todoInner += '</a>';
    todoInner += '<label class="i-checks" for="' + item.id +'">';
    todoInner += '<input type="checkbox" id="' + item.id + '"' + checkId +'><i></i>';
    todoInner += '<span class="' + checkId +'">' + item.content + '</span>';
    todoInner += '</label>';
    todoInner += '</div>';
    todoInner += '</li>';
  });

  todoUl.innerHTML = todoInner;
  completeAll.innerHTML = '완료된 할일 : ' + countComplete() + '개';
}

// ID값 얻기
function getId(){
  return todos.length ? Math.max.apply(null, todos.map( function (item){
    return item.id;
  })) + 1 : 1;
}

// 할일 추가
function addTodo(event){
  todos = todos.concat([{ id: getId(), content: event.target.value, completed: false }]);
  inputTodo.value = '';
  console.log('[[ADD DATA]] :', todos);
}

// 할일 삭제
function deleteTodo(event){
  todos = todos.filter(function (item) {
    return item.id !== Number.parseInt(event.target.dataset.id);
  });
  console.log('[[DELETE COMPLETED]]', todos);
}

// 체크박스시 completed 값 반전시키기
function chkChange(event){
  todos.forEach(function (item) {
    if (item.id === Number.parseInt(event.target.id)) item.completed = !item.completed;
  });
  console.log('[[CHANGE COMPLETED]]', todos);
}


