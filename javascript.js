const btnAddBook = document.querySelectorAll(".addBookForm input")[1];
const inputTxet = document.querySelectorAll(".addBookForm input")[0];
const ul = document.querySelector("ul");
const checkBox = document.querySelector(".hideInput");
const searchBookList = document.querySelector(".searchForm input");
const spanDelete = `<span class="deleteBook"> حذف </span>`

btnAddBook.addEventListener("click" , function(e){
    const valueOfInputText = inputTxet.value;
    const li = document.createElement("li");
    const spanName = document.createElement("span");
    spanName.className = "nameBook";
    spanName.textContent = valueOfInputText;

    li.appendChild(spanName);
    li.innerHTML += spanDelete; 

    ul.appendChild(li);

    saveInLocalStorage(inputTxet.value);

    inputTxet.value = "";
    e.preventDefault;

})


ul.addEventListener("click" , function(e){
    if(e.target.className == "deleteBook"){
        e.target.parentElement.remove();
        deleteFromLocalStorage(e.target.parentElement.children[0].textContent);
    }
})


checkBox.addEventListener("click" , function(e){
        const titleBookList = document.querySelector(".titleBookList");
    if(checkBox.checked === true){
        ul.style.display = "none";
        titleBookList.style.display = "none";
    }else{
        ul.style.display = "block";
        titleBookList.style.display = "block";
    }
})


searchBookList.addEventListener("keyup" , function(e){
    for(let book of ul.children){
        if(book.firstElementChild.textContent.indexOf(searchBookList.value) !== -1){
            book.style.display = "flex";
        }
        else{
            book.style.display = "none";
        }
    }
})


document.addEventListener("DOMContentLoaded" , function(e){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = localStorage.getItem("tasks").split(',');
    }


    for(let item of tasks){
        const li = document.createElement("li");
        const spanName = document.createElement("span");
        spanName.className = "nameBook";
        spanName.textContent = item;

        li.appendChild(spanName);
        li.innerHTML += spanDelete; 

        ul.appendChild(li);
    }


})


function saveInLocalStorage(ask){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = localStorage.getItem("tasks").split(',');
    }
    tasks.push(task);
    localStorage.setItem("tasks" , tasks);
}

function deleteFromLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = localStorage.getItem("tasks").split(',');
    }

    for(let i = 0 ; i < tasks.length ; i++){
        if(tasks[i] === task){
            tasks.splice(i , 1);
        }
    }

    if(tasks.length === 0){
        localStorage.clear();
    }else{
    localStorage.setItem("tasks" , tasks);
    }

}