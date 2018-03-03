(function () {
  let todos = [{ id: 0, content: 'HTML', completed: true }, { id: 1, content: 'CSS', completed: false }, { id: 2, content: 'Javascript', completed: true }, { id: 3, content: 'JSON', completed: true }, { id: 4, content: 'Ajax', completed: false }];
  const todoUl = document.querySelector('#todo-list');
  const inputTodo = document.querySelector('#input-todo');
  const chkAllComple = document.querySelector('#chk-allComplete');
  const selectTodo = document.querySelector('.nav');
  const searchTodo = document.querySelector('#search-todo');
  const removeCompleted = document.querySelector('#btn-removeCompletedTodos');
  let status = 'all';

  function deleteCompleted() {
    todos = todos.filter(item => item.completed !== true);
  }

  // 완료된 할일 수 반환
  function countComplete() {
    let completCount = 0;

    todos.forEach(item => {
      if (item.completed === true) completCount += 1;
    });

    return completCount;
  }

  // 전체 선택 및 전체 해제
  function checkAll() {
    if (countComplete() !== todos.length) {
      todos.forEach(item => {
        item.completed = true;
      });
    } else {
      todos.forEach(item => {
        item.completed = false;
      });
    }
    console.log('[[CHANGE ALL]]', todos);
  }
  //
  function selectActive() {
    selectTodo.children.all.removeAttribute('class');
    selectTodo.children.completed.removeAttribute('class');
    selectTodo.children.active.removeAttribute('class');
    document.querySelector(`#${status}`).setAttribute('class', 'active');
  }

  // 데이터 로드
  function loadData() {
    const messageTodo = document.querySelector('#message-todo');
    let todoInner = '';
    let arrayName;

    // 완료 상태
    if (status === 'completed') {
      status = 'completed';
      selectActive();

      arrayName = todos.filter(item => item.completed === true);

      // 미완료 상태
    } else if (status === 'active') {
      status = 'active';
      selectActive(status);

      arrayName = todos.filter(item => item.completed === false);

      // 자동 검색
    } else if (status === 'search') {
      // 정규 표현식 사용
      const regexr = new RegExp(searchTodo.value, 'ig');

      arrayName = todos.filter(item => regexr.test(item.content));

      if (!searchTodo.value) arrayName = todos;
    } else {
      status = 'all';
      selectActive(status);

      arrayName = todos;
    }

    // 리스트가 없을 시 메세지 보여주기
    if (!arrayName.length) {
      messageTodo.style.display = 'block';
    } else {
      messageTodo.style.display = 'none';
    }

    // 리스트 목록 출력
    arrayName.forEach(item => {
      const checkId = (item.completed) ? 'checked' : '';

      todoInner += `<li class="list-group-item">
                    <div class="hover-anchor">
                      <a class="hover-action text-muted">
                        <span class="glyphicon glyphicon-remove-circle pull-right" data-id=" ${item.id} "></span>
                      </a>
                      <label class="i-checks" for=" ${item.id} ">
                        <input type="checkbox" id=" ${item.id} " + ${checkId} + "><i></i>
                        <span class=" ${checkId} "> ${item.content} </span>
                      </label>
                    </div>
                  </li>`;
    });

    todoUl.innerHTML = todoInner;
    document.querySelector('#completedTodos').innerHTML = `완료된 할일 :  ${countComplete()} 개`;

    document.querySelector('#activeTodos').innerHTML = todos.length - countComplete();
  }

  // ID값 얻기
  function getId() {
    return todos.length ? Math.max.apply(null, todos.map(item => item.id)) + 1 : 1;
  }

  // 할일 추가
  function addTodo(event) {
    todos = todos.concat([{ id: getId(), content: event.target.value, completed: false }]);
    inputTodo.value = '';
    console.log('[[ADD DATA]] :', todos);
  }

  // 할일 삭제
  function deleteTodo(event) {
    todos = todos.filter(item => item.id !== event.target.dataset.id * 1);
    console.log('[[DELETE COMPLETED]]', todos);
  }

  // 체크박스시 completed 값 반전시키기
  function chkChange(event) {
    todos.forEach(item => {
      if (item.id === event.target.id * 1) item.completed = !item.completed;
    });
    console.log('[[CHANGE COMPLETED]]', todos);
  }

  window.addEventListener('load', () => {
    loadData();
  });

  searchTodo.addEventListener('keyup', () => {
    status = 'search';
    loadData();
  });

  inputTodo.addEventListener('keyup', event => {
    if (event.keyCode === 13 && event.target.value) {
      addTodo(event);
      loadData();
    }
  });

  todoUl.addEventListener('click', event => {
    if (event.target.parentNode.nodeName === 'A') {
      deleteTodo(event);
      loadData();
    }
    if (event.target.nodeName === 'INPUT') {
      chkChange(event);
      loadData();
    }
  });

  selectTodo.addEventListener('click', event => {
    status = event.target.parentNode.id;
    loadData();
  });

  chkAllComple.addEventListener('click', () => {
    checkAll();
    loadData();
  });

  removeCompleted.addEventListener('click', () => {
    deleteCompleted();
    loadData();
  });
}());
