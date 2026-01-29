        let taskObjArray = [];
        const form = document.getElementById("taskBoxFormId");
        const inputtedTask = document.getElementById("inputTaskId");
        function addTask(){
                document.getElementById("taskBoxId").style.display = "block";
        }
        function taskAdded(){
                console.log("your task has been saved/updated");
                document.getElementById("taskBoxId").style.display = "none";
        }
        function taskBoxRemoved(){
                console.log("your task was not saved/updated");
                document.getElementById("taskBoxId").style.display = "none";
        }
        document.getElementById("taskBoxFormId").addEventListener("submit",function(event){
                event.preventDefault();
                const selectedStatus = document.querySelector(
                        'input[name="taskstatus"]:checked'
                );

                if((inputtedTask.value.trim() !== "")&& (selectedStatus !== null)){
                        taskAdded();
                        // selecting the choosen taskstatus
                        taskObjArray.push(
                                {
                                        "task": inputtedTask.value,
                                        "status": selectedStatus.value,
                                }
                        );
                        saveTasks();
                        renderTable();
                        form.reset();
                        // console.log(taskObjArray);
                }
        });

        // logic for updating array whenever the task form is filled
        const tableBody = document.querySelector("tbody");
        const renderTable = () =>{
                tableBody.innerHTML = "";

                taskObjArray.forEach((item,index)=>{
                        const row = document.createElement("tr");

                        row.innerHTML = 
                        `<td>${index+1}</td>
                        <td>${item.task}</td>
                        <td>${item.status}</td>
                        <td>
                        <Button onclick="removeTask(${index})">remove</Button>      
                        </td>
                        `
                        tableBody.appendChild(row);
                })
                if (taskObjArray.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4">No tasks added yet 🚀</td></tr>`;
                return;
                }

        }
        // remove task 
        function removeTask(removeIndex){
                let result = confirm("Are you sure want to remove this task item ? Make sure this can't be undo.");
                if(result){
                        taskObjArray.splice(removeIndex,1);
                        console.log("your task was removed");
                        saveTasks();
                }
                else{
                        console.log("your task wasn't removed")
                }
                console.log(taskObjArray);
                renderTable();
                
        }
        // save tasks to local storage 
        function saveTasks() {
                localStorage.setItem("tasks", JSON.stringify(taskObjArray));
        }
        // loading tasks on page refresh
        window.addEventListener("DOMContentLoaded", () => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
        taskObjArray = JSON.parse(storedTasks);
        renderTable();
    }
});
        // remove all tasks
        function removeAllTask(){
                if(taskObjArray.length > 0 ){
                        let result = confirm("Are you sure want to clear all existing task !!! This Can't Be UNDO !!! ");
                        if(result){
                                taskObjArray.length = 0;
                                renderTable();
                                saveTasks();
                        }
                }
        }

