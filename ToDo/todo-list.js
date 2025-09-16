const todoListname=[];
function Todolist(){
    const taskInputelement=document.querySelector('.js-todo-input');
    const name=taskInputelement.value;
    
    const dateInputelement=document.querySelector('.js-todo-date-input');
    const date=dateInputelement.value;

    todoListname.push({
        name:name,
        duedate:date,
    });

    
    taskInputelement.value='';
    dateInputelement.value='';
    renderTodolist();
}
function renderTodolist(){
    let htmlElement='';
    for(let i=0;i<todoListname.length;i++){
        const name=todoListname[i].name;
        const date=todoListname[i].duedate;
        const html= `
        <div class="todo-grid-task">${name}</div>
        <div class="todo-grid-task">${date}</div>
        <div>
            <button class="remove-button" onclick="
            todoListname.splice(${i},1);
            renderTodolist();
            ">Remove</button>
        </div>`;
        htmlElement+=html;
    }
    document.querySelector('.todo-list')
        .innerHTML=`${htmlElement}`;
}
function handleKeydown(event){
    if(event.key==='Enter'){
        Todolist();
    }
}