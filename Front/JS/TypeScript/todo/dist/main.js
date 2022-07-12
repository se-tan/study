var Todo = /** @class */ (function () {
    function Todo(props) {
        this.addTodo = document.querySelector(props.inputhook);
        this.createTodo = document.querySelector(props.submit);
        this.addListTarget = document.querySelector(props.showTarget);
        this.modalState = false;
        this.InputTodos();
        this.deleteTodoList();
        this.editTodoList();
        this.setStoredTodos();
    }
    Todo.prototype.InputTodos = function () {
        var _this = this;
        this.addTodo.addEventListener("change", function (e) {
            e.preventDefault();
            var inputVal = e.target.value;
            _this.addTodoList(inputVal);
        });
    };
    Todo.prototype.addTodoList = function (inputVal) {
        var _this = this;
        var clear = "";
        this.createTodo.addEventListener("click", function (e) {
            e.preventDefault();
            if (!inputVal.trim()) {
                return null;
            }
            else {
                var newTask = "\n          <div class=\"list\">\n            <p class=\"content\">" + inputVal + "</p>\n            <div class=\"menu\">\n              <button class=\"editBtn btn\">\u7DE8\u96C6</button>\n              <button class=\"deleteBtn btn\">\u524A\u9664</button>\n            </div>\n          </div>\n          ";
                _this.addListTarget.insertAdjacentHTML("beforeend", newTask);
                _this.addTodo.value = clear;
                inputVal = clear;
                _this.deleteTodoList();
                _this.editTodoList();
                _this.storeLocalStorage();
            }
        });
    };
    Todo.prototype.deleteTodoList = function () {
        var _this = this;
        var todos = document.querySelectorAll("list");
        var deleteBtns = document.querySelectorAll(".deleteBtn");
        deleteBtns.forEach(function (deleteBtn, index) {
            deleteBtn.addEventListener("click", function () {
                todos[index].remove();
                _this.storeLocalStorage();
            });
        });
    };
    Todo.prototype.editTodoList = function () {
        var _this = this;
        var modalOverlay = document.querySelector(".modal-overlay");
        var editBtns = document.querySelectorAll(".editBtn");
        var contents = document.querySelectorAll(".content");
        editBtns.forEach(function (editBtn, index) {
            editBtn.addEventListener("click", function (e) {
                e.preventDefault();
                var _target = contents[index];
                var _index = index;
                var modal = document.querySelector(".modal");
                modal.classList.remove("js-is^close");
                modal.classList.add("js-is-open");
                modalOverlay.classList.remove("js-modal-off");
                _this.editTodoModalOpen(_target, _index, modal, modalOverlay);
            });
        });
    };
    Todo.prototype.editTodoModalOpen = function (_target, _index, modal, modalOverlay) {
        var _this = this;
        this.modalState = true;
        var taskContent = _target.textContent;
        var modal_inner = "\n      <div class=\"modal_inner\">\n        <input class=\"editNow\" type=\"text\" value=" + taskContent + " /><p class=\"none\">" + taskContent + "</p>\n        <div>\n          <button class=\"updateBtn\">\u66F4\u65B0</button>\n        </div>\n      </div>\n    ";
        modal.innerHTML = modal_inner;
        var editContentInput = document.querySelector(".editNow");
        var updateBtn = document.querySelector(".updateBtn");
        editContentInput.addEventListener("change", function (e) {
            _target.textContent = e.target.value;
            _this.storeLocalStorage();
        });
        updateBtn.addEventListener("click", function () {
            var clear = "";
            editContentInput.value = clear;
            modal.classList.add("js-is-close");
            modal.classList.remove("js-is-open");
            modalOverlay.classList.add("js-modal-off");
        });
    };
    Todo.prototype.storeLocalStorage = function () {
        var tasks = [];
        var lists = document.querySelectorAll(".list p");
        lists.forEach(function (list) {
            tasks.push(list.textContent);
        });
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
    };
    Todo.prototype.setStoredTodos = function () {
        var _this = this;
        var callTasks = JSON.parse(window.localStorage.getItem("tasks"));
        callTasks.map(function (task) {
            var newTask = "\n        <div class=\"list\">\n          <p class=\"content\">" + task + "</p>\n          <div class=\"menu\">\n            <button class=\"editBtn btn\">\u7DE8\u96C6</button>\n            <button class=\"deleteBtn btn\">\u524A\u9664</button>\n          </div>\n        </div>\n      ";
            _this.addListTarget.insertAdjacentHTML("beforeend", newTask);
            _this.deleteTodoList();
            _this.editTodoList();
        });
    };
    return Todo;
}());
var newTodo = new Todo({
    Inputhook: ".addTodo",
    submit: ".submit",
    showTarget: ".todolist",
});
