'use strict';

const addBtn = document.getElementById('btn_list');
const setInput = document.getElementById('description_task');
const toDoWrap = document.querySelector('.todos_wrapper');
let tasks = null;
let toDoItems = [];

!localStorage.tasks ? tasks = [] : tasks =  JSON.parse(localStorage.getItem('tasks'));

function task (description){ 
    this.description = description;
    this.status = 'no-status';
}

const createTemplate = (task, index) =>{
    return ` 
    <div class="todo_item">
        <div class="description">${task.description}</div>
            <div class="wrapper_buttons">

                <select class="todos_status" data-index="${index}">
                    <option value="no-status" ${task.status === "no-status" ? 'selected' : ''}>No-status</option> 
                    <option value="completed" ${task.status === "completed" ? 'selected' : ''}>Completed</option>
                    <option value="pending" ${task.status === "pending" ? 'selected' : ''}>Pending</option>   
                </select>
                
                <button class="btn_delete" data-index="${index}">Delete</button>
            </div>   
    </div> 
    `
}

const fillTodo = () => {
    toDoWrap.innerHTML = "";
 
    if(tasks.length > 0){ 
        tasks.forEach((item, index) => {
            toDoWrap.innerHTML += createTemplate(item, index);
           
        });

        toDoItems = document.querySelectorAll('.todo_item')       
    }  
}

fillTodo();

const localUp = (data) =>{
    localStorage.setItem('tasks', JSON.stringify(data || tasks))
}


addBtn.addEventListener('click', () => {

    if(setInput.value.trim() === '') return

    tasks.push(new task(setInput.value))
    localUp();
    fillTodo(); 
    setInput.value = ''  
    

})

const deleteTask = index =>{

    toDoItems[index].classList.add('deletion');    
        
    setTimeout(()=>{ 
        tasks.splice(index,1)
        localUp();
        fillTodo();
    },500);

}

toDoWrap.addEventListener('click', event =>{

    event.stopPropagation();

    if(!event.target.classList.contains('btn_delete')) return;

    const index = event.target.getAttribute('data-index');
    deleteTask(index);
});


toDoWrap.addEventListener('change', event => {

    event.stopPropagation();

    if(!event.target.classList.contains('todos_status')) return;
   
    const index = event.target.getAttribute('data-index')

    const data = structuredClone(tasks);

    if(!data.length) return;

    console.log(event.target.value);

    data[index].status = event.target.value
    
    localUp(data);

});

