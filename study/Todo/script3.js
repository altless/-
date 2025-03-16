const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    // 배열 처음에 새로운 아이템 추가

    todos.unshift(item); // unshift = 배열 처음 부분에 요소넣기

    //요소 생성하기

    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElement(item)

    list.prepend(itemEl); // prepend - pre , append 노드를 처음부분에 넣기

    inputEl.removeAttribute('disabled');

    inputEl.focus();
    saveToLocalStorage();

}


function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    const checkboxEl = document.createElement('input');
    checkboxEl.type = "checkbox"
    checkboxEl.checked = item.complete;

    if(item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = "edit"

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = "remove_circles";

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id);

        itemEl.remove();
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }        
        saveToLocalStorage()
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })
    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');  
        saveToLocalStorage();
    })

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}


function saveToLocalStorage() {
    const data = JSON.stringify(todos);  // 로컬스토리지엔 모두 스트링으로 넣어야함

    window.localStorage.setItem('my_todos', data); //window 객체는 생략가능
}


function loadFromLocalStorage() {
    const data = window.localStorage.getItem('my_todos'); //data에 로컬스토리지에서 todos[]가져오기

    if (data) {
        todos = JSON.parse(data); // 스트링형식을 JS obj로 변경
    }
}

function displayTodos() {
    loadFromLocalStorage(); //로컬스토리지에 있는 데이터를 todos안에 넣기

        for (let i = 0; i < todos.length; i++) {
            const item = todos[i];
            const { itemEl } = createTodoElement(item);
        
            list.append(itemEl);
        }
}


displayTodos();