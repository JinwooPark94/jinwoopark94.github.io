var todosData = [{ id: 0, value: 'HTML', completed: true, date: '02-20' },
                 { id: 1, value: 'CSS', completed: false, date: '02-20' },
                 { id: 2, value: 'Javascript', completed: true, date: '02-20' }];

var elem = document.querySelector('#input-todo');
var ul = document.querySelector('#todo-list');
var countP = document.querySelector('#count-complt');
var allComP = document.querySelector('#all-complt');

// 윈도우 로드시 데이터 update
window.addEventListener('load', function () {
  // 서버에 접속하여 todos 배열을 취득
  updateData();
});

// 데이터 추가
elem.addEventListener('keyup', function (e) {
  addData(e);
});

// 데이터 삭제
ul.addEventListener('click', function (e) {
  deleteData(e);
});

// 체크박스 클릭시 데이터 completed 값 반전시키기
ul.addEventListener('change', function (e) {
  checkboxUpd(e);
});

// 총 완료 항목 추가
allComP.addEventListener('click', function (e) {
  completeAll();
  updateData();
});

// ID 만들기
function generateId(){
  return todosData.length ? Math.max.apply(null, todosData.map( function (item) {
    return item.id;
  })) + 1 : 1;
}

// 새로운 값 추가
function addData(e) {
  if (e.keyCode !== 13 || !elem.value) return;

  todosData = todosData.concat({ id: generateId(), value: elem.value, completed: false, date: getMonthDate() });
  updateData();
  elem.value = '';
  console.log( '[[ADD Todo]]', todosData );
}

// 데이터 업데이트
function updateData() {
  if( !todosData.length ) {
    ul.innerHTML = '';
    return countP.innerHTML = '총 ' + completeCount() + '항목 완료';
  }

  var ulContent = '';
  todosData.forEach(function (item) {
    var dateShow = item.date.split('-');
    var checked = (item.completed === true) ? 'checked' : '';

    // ul.innerHTML += '<li id=' + item.id + '><input id="chk-' + item.id + '" class="chk-input" type="checkbox" ' + checked + '>' + '<span class=' + checked + '>' + item.value + '</span>' + '<time class="date-md">' + dateShow[0] + '월 ' + dateShow[1] + '일' + '</time><i class="icon-cancel"></i></li>';

    ulContent += '<li id=' + item.id + '>';
    ulContent += '<input id="chk-' + item.id + '" class="chk-input" type="checkbox" ' + checked + '>';
    ulContent += '<span class=' + checked + '>' + item.value + '</span>';
    ulContent += '<time class="date-md">' + dateShow[0] + '월 ' + dateShow[1] + '일' + '</time>';
    ulContent += '<i class="icon-cancel"></i>';
    ulContent += '</li>';

    ul.innerHTML = ulContent;
  });

  countP.innerHTML = '총 ' + completeCount() + '항목 완료';
}

// 아이콘 클릭시 해당 값 삭제
function deleteData(e) {
  if (e.target.nodeName !== 'I') return;
    //deleteId = Number.parseInt(e.target.offsetParent.id);
    todosData = todosData.filter(function (todo) {
      return todo.id !== Number.parseInt(e.target.parentNode.id);
    });

    //delete todosData[deleteId];
    //todosData.splice(deleteId, 1);

    ul.innerHTML = '';
    updateData();
    console.log( '[[REMOVE Todo]]', todosData );

}

// 완료된 항목 값 가져오기
function completeCount() {
  var count = 0;
  todosData.map(function (item) {
    if (item.completed === true) count++;
  });
  return count;
}

// 현재 월, 일 가져오기
function getMonthDate() {
  var today = new Date();
  var month = today.getMonth() + 1;
  date = today.getDate();

  month = month < 10 ? '0' + month : month;

  return month + '-' + date;
}

// 전체 완료 및 해제
function completeAll() {
  var trueVal = 0;

  todosData.map(function (item) {
    (item.completed === true) ? trueVal++ : 0;
  });

  if (trueVal !== todosData.length) {
    todosData.map(function (item) {
      item.completed = true;
    });
  } else {
    todosData.map(function (item) {
      item.completed = false;
    });
  }

  console.log('[[ALL COMPLETEED CHANGE]]', todosData);

}

// 체크 박스 클릭시 completed 반전
function checkboxUpd(e) {
  todosData = todosData.map(function (item) {
    return (item.id === Number.parseInt(e.target.parentNode.id)) ? Object.assign({}, item, { completed : !item.completed }) : item;
    //if (item.id === chkId) item.completed = !item.completed;
  });
  updateData();

  console.log('[[CHECKED CHANGE]]', todosData);
}