(function () {
  var todos = [{ id: 0, content: 'HTML', completed: true },
               { id: 1, content: 'CSS', completed: false },
               { id: 2, content: 'Javascript', completed: true },
               { id: 3, content: 'JSON', completed: true },
               { id: 4, content: 'Ajax', completed: false }];

  var todoUl = document.querySelector('#todo-list');
  var inputTodo = document.querySelector('#input-todo');
  var chkAllComple = document.querySelector('#chk-allComplete');
  var selectTodo = document.querySelector('.nav');
  var searchTodo = document.querySelector('#search-todo');
  var removeCompleted = document.querySelector('#btn-removeCompletedTodos');

  var status = 'all';

  window.addEventListener('load', function () {
    loadData();
  });

  searchTodo.addEventListener('keyup', function (event) {
    status = 'search';
    loadData();
  });

  inputTodo.addEventListener('keyup', function (event) {
    if (event.keyCode === 13 && event.target.value) {
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
      loadData();
    }
  });

  selectTodo.addEventListener('click', function(event) {
    status = event.target.parentNode.id;
    loadData();
  });

  chkAllComple.addEventListener('click', function () {
    checkAll();
    loadData();
  });

  removeCompleted.addEventListener( 'click', function() {
    deleteCompleted();
    loadData();
  });

  function deleteCompleted(){
    todos = todos.filter(function (item){
      console.log(item.completed);
      return (item.completed !== true) ? true : false;
    });
  }

  // 전체 선택 및 전체 해제
  function checkAll() {
    if (countComplete() !== todos.length) {
      todos.forEach(function (item) {
        return item.completed = true;
      });
    } else {
      todos.forEach(function (item) {
        return item.completed = false;
      });
    }
    console.log('[[CHANGE ALL]]', todos);
  }

  // 완료된 할일 수 반환
  function countComplete() {
    var completCount = 0;

    todos.forEach(function (item) {
      if (item.completed === true) completCount++;
    });

    return completCount;
  }

  //
  function selectActive(status){
    selectTodo.children.all.removeAttribute('class');
    selectTodo.children.completed.removeAttribute('class');
    selectTodo.children.active.removeAttribute('class');

    document.querySelector('#' + status).setAttribute('class', 'active');
  }

  // 데이터 로드
  function loadData() {
    var messageTodo = document.querySelector('#message-todo');
    var todoInner = '';
    var arrayName;

    // 완료 상태
    if (status === 'completed') {
      status = 'completed';
      selectActive(status);

      arrayName = todos.filter(function (item) {
        return item.completed === true;
      });

      // 미완료 상태
    } else if (status === 'active') {
      status = 'active';
      selectActive(status);

      arrayName = todos.filter(function (item) {
        return item.completed === false;
      });

      // 자동 검색
    } else if (status === 'search') {

      // 정규 표현식 사용
      var regexr = new RegExp(searchTodo.value, "ig");

      arrayName = todos.filter(function (item) {
        return regexr.test(item.content);
      });

      if (!searchTodo.value) arrayName = todos;

    } else {
      status = 'all';
      selectActive(status);

      arrayName = todos;
    }

    (!arrayName.length) ? messageTodo.style.display = 'block' : messageTodo.style.display = 'none';

    // 리스트 목록 출력
    arrayName.map(function (item) {
      var checkId = (item.completed) ? 'checked' : '';

      todoInner  += '<li class="list-group-item"> \
                     <div class="hover-anchor"> \
                       <a class="hover-action text-muted"> \
                         <span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + item.id + '"></span> \
                       </a> \
                       <label class="i-checks" for="' + item.id + '"> \
                         <input type="checkbox" id="' + item.id + '"' + checkId + '><i></i> \
                         <span class="' + checkId + '">' + item.content + '</span> \
                       </label> \
                     </div> \
                    </li>';
    });

    todoUl.innerHTML = todoInner;
    document.querySelector('#completedTodos').innerHTML = '완료된 할일 : ' + countComplete() + '개';
    //completedTodos.innerHTML = '완료된 할일 : ' + countComplete() + '개';

    document.querySelector('#activeTodos').innerHTML = todos.length - countComplete();
    //activeTodos.innerHTML = todos.length - countComplete();
  }

  // ID값 얻기
  function getId() {
    return todos.length ? Math.max.apply(null, todos.map(function (item) {
      return item.id;
    })) + 1 : 1;
  }

  // 할일 추가
  function addTodo(event) {
    todos = todos.concat([{ id: getId(), content: event.target.value, completed: false }]);
    inputTodo.value = '';
    console.log('[[ADD DATA]] :', todos);
  }

  // 할일 삭제
  function deleteTodo(event) {
    todos = todos.filter(function (item) {
      return item.id !== Number.parseInt(event.target.dataset.id);
    });
    console.log('[[DELETE COMPLETED]]', todos);
  }

  // 체크박스시 completed 값 반전시키기
  function chkChange(event) {
    todos.forEach(function (item) {
      if (item.id === Number.parseInt(event.target.id)) item.completed = !item.completed;
    });
    console.log('[[CHANGE COMPLETED]]', todos);
  }
}());