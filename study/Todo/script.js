const list = document.getElementById('list');
const createBtn = document.getElementById('create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    const item = {
        id: Date.now(),
        text: "",
        complete: false
    };

    todos.unshift(item);
    const { itemEl, inputEl } = createTodoElement(item);
    list.prepend(itemEl);
    
    inputEl.removeAttribute('disabled');
    inputEl.focus();
    saveTodos();
}

function createTodoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = "checkbox";
    checkboxEl.checked = item.complete;
    if (item.complete) itemEl.classList.add('complete');

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = "edit";

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = "remove_circle";

    // 이벤트 핸들러 추가
    addEventListeners({ item, itemEl, inputEl, checkboxEl, editBtnEl, removeBtnEl });

    actionsEl.append(editBtnEl, removeBtnEl);
    itemEl.append(checkboxEl, inputEl, actionsEl);

    return { itemEl, inputEl };
}

function addEventListeners({ item, itemEl, inputEl, checkboxEl, editBtnEl, removeBtnEl }) {
    removeBtnEl.addEventListener('click', () => removeTodo(item, itemEl));
    editBtnEl.addEventListener('click', () => editTodo(inputEl));
    checkboxEl.addEventListener('change', () => toggleComplete(item, itemEl, checkboxEl));
    inputEl.addEventListener('change', () => updateText(item, inputEl));
    inputEl.addEventListener('blur', () => inputEl.setAttribute('disabled', ''));
}

function removeTodo(item, itemEl) {
    todos = todos.filter(t => t.id !== item.id);
    itemEl.remove();
    saveTodos();
}

function editTodo(inputEl) {
    inputEl.removeAttribute('disabled');
    inputEl.focus();
}

function toggleComplete(item, itemEl, checkboxEl) {
    item.complete = checkboxEl.checked;
    itemEl.classList.toggle('complete', item.complete);
    saveTodos();
}

function updateText(item, inputEl) {
    item.text = inputEl.value;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem('my_todos', JSON.stringify(todos));
}

function loadTodos() {
    const data = localStorage.getItem('my_todos');
    todos = data ? JSON.parse(data) : [];
}

function renderTodos() {
    list.innerHTML = "";
    todos.forEach(item => {
        const { itemEl } = createTodoElement(item);
        list.appendChild(itemEl);
    });
}

// 초기 로딩
loadTodos();
renderTodos();