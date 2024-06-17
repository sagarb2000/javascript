document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('new-todo');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById ('todo-list');
 loadTodos();
        addButton.addEventListener('click',() => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            todoInput.value = '';
            saveTodos();
        }
    });

   
    function addTodoItem(todoText) {
        const li = document.createElement('li');
        li.textContent = todoText;
        todoList.appendChild(li);
    }

   
    function loadTodos() {
        const todos = getCookie('todos');
        if (todos) {
            const todoArray = JSON.parse(todos);
            todoArray.forEach(todoText => addTodoItem(todoText));
        }
    }

   
    function saveTodos() {
        const todos = [];
        todoList.childNodes.forEach(li => {
            if (li.nodeType === Node.ELEMENT_NODE) {
                todos.push(li.textContent);
            }
        });
        setCookie('todos', JSON.stringify(todos), 7); // Save for 7 days
    }

   
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

   
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                return c.substring(cname.length, c.length);
            }
        }
        return "";
    }
});

