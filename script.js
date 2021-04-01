//Define UI element

let form      = document.querySelector('#task_form');
let taskList  = document.querySelector('ul');
let clearBtn  = document.querySelector('#clear_task_btn');
let filter    = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');


//Define Event Listener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask); //keyup event when any button press on keyboard
document.addEventListener('DOMContentLoaded', getTasks);


//Define Event Function
//add Task

function addTask(e){
    if(taskInput.value === ''){
        alert ('Must Add a Task');
    } else {
        // create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#'); //hreaf na use korle click option ashbe na
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);
        
        taskInput.value = '';
      

    }

    e.preventDefault();
}

//Remove Task

function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("Are you Sure?")){
            let ele = e.target.parentElement;
            ele.remove();
            //console.log(ele);
            removeFromLS(ele);
        }
    console.log(e.target) 
}
}

//clear task

function clearTask(e){
    taskList.innerHTML = "";

    localStorage.clear();
}

//Filter data 

function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){   // kono index khuje paoa na gele ta -1 return kore 
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    } )
}

//Store in local Storage 

function storeTaskInLocalStorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {  //check korbe local storage e tasks name keu ache kina 
        tasks = [];  // na thakle khali array ashbe 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  // json parse kore anle object hishebe use kora jay
    
    }
    tasks.push(task);  // keu na thakle item push hobe 
    localStorage.setItem('tasks', JSON.stringify(tasks));  // local storage e string akare save hoye thake
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {  
        tasks = [];  
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#'); //hreaf na use korle click option ashbe na
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

function removeFromLS(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {  
        tasks = [];  
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    let li = taskItem;
    li.removeChild(li.lastChild); // 

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
}