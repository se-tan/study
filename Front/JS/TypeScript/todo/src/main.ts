class Todo {

  addTodo: any;
  createTodo: any;
  addListTarget: any;
  modalState: boolean;

  
  constructor(props: any) {

    this.addTodo = document.querySelector<HTMLElement>(props.inputhook);
    this.createTodo = document.querySelector<HTMLElement>(props.submit);
    this.addListTarget = document.querySelector<HTMLElement>(props.showTarget);
    this.modalState = false;

    this.InputTodos();
    this.deleteTodoList();
    this.editTodoList();
    this.setStoredTodos();
  }

  InputTodos() {
    this.addTodo.addEventListener("change", (e: any): void => {
      e.preventDefault();
      let inputVal: string = e.target.value;
      this.addTodoList(inputVal);
    });
  }

  addTodoList(inputVal: string) {
    const clear: string = "";

    this.createTodo.addEventListener("click", (e: any): void => {
      e.preventDefault();

      if (!inputVal.trim()) {
        return null;
      } else {
        const newTask = `
          <div class="list">
            <p class="content">${inputVal}</p>
            <div class="menu">
              <button class="editBtn btn">編集</button>
              <button class="deleteBtn btn">削除</button>
            </div>
          </div>
          `;
        this.addListTarget.insertAdjacentHTML("beforeend", newTask);
        this.addTodo.value = clear;
        inputVal = clear;

        this.deleteTodoList();
        this.editTodoList();
        this.storeLocalStorage();
      }
    });
  }

  deleteTodoList() {
    const todos = document.querySelectorAll<HTMLElement>("list");
    const deleteBtns = document.querySelectorAll<HTMLElement>(".deleteBtn");

    deleteBtns.forEach((deleteBtn, index) => {
      deleteBtn.addEventListener("click", () => {
        todos[index].remove();
        this.storeLocalStorage();
      });
    });
  }

  editTodoList() {
    const modalOverlay = document.querySelector<HTMLElement>(".modal-overlay");
    const editBtns = document.querySelectorAll<HTMLElement>(".editBtn");
    const contents = document.querySelectorAll<HTMLElement>(".content");

    editBtns.forEach((editBtn, index) => {
      editBtn.addEventListener("click", (e: any): void => {
        e.preventDefault();

        const _target: HTMLElement = contents[index];
        const _index: number = index;
        const modal = document.querySelector<HTMLElement>(".modal");
        modal.classList.remove("js-is-close");
        modal.classList.add("js-is-open");
        modalOverlay.classList.remove("js-modal-off");
        this.editTodoModalOpen(_target, _index, modal, modalOverlay);
      });
    });
  }

  editTodoModalOpen(
    _target: HTMLElement,
    _index: number,
    modal: HTMLElement,
    modalOverlay: HTMLElement
  ) {
    this.modalState = true;

    const taskContent: string = _target.textContent;
    let modal_inner: string = `
      <div class="modal_inner">
        <input class="editNow" type="text" value=${taskContent} /><p class="none">${taskContent}</p>
        <div>
          <button class="updateBtn">更新</button>
        </div>
      </div>
    `;

    modal.innerHTML = modal_inner;
    const editContentInput = document.querySelector<HTMLInputElement>(".editNow");
    const updateBtn = document.querySelector<HTMLElement>(".updateBtn");

    editContentInput.addEventListener("change", (e: any): void => {
      _target.textContent = e.target.value;
      this.storeLocalStorage();
    });
    updateBtn.addEventListener("click", () => {
      let clear: string = "";
      editContentInput.value = clear;
      modal.classList.add("js-is-close");
      modal.classList.remove("js-is-open");
      modalOverlay.classList.add("js-modal-off");
    });
  }

  storeLocalStorage() {
    let tasks: string[] = [];
    const lists = document.querySelectorAll<HTMLElement>(".list p");
    lists.forEach((list) => {
      tasks.push(list.textContent);
    });
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  setStoredTodos() {
    const callTasks: string[] = JSON.parse(window.localStorage.getItem("tasks"));
    callTasks.map((task) => {
      const newTask = `
        <div class="list">
          <p class="content">${task}</p>
          <div class="menu">
            <button class="editBtn btn">編集</button>
            <button class="deleteBtn btn">削除</button>
          </div>
        </div>
      `;

      this.addListTarget.insertAdjacentHTML("beforeend", newTask);
      this.deleteTodoList();
      this.editTodoList();
    });
  }
}

const newTodo = new Todo({
  Inputhook: ".addTodo",
  submit: ".submit",
  showTarget: ".todolist",
});
