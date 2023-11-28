let submitForm = document.querySelector(".form1");
let recordContainer = document.getElementById("records-Container");
let createButton = document.querySelector(".boot");
submitForm.addEventListener("submit", onSubmitForm);

let formState = "CREATE";

let empId = 1000;
let employeeList = [];

function onSubmitForm(event){
    
    event.preventDefault(); 
    const employee = {
    EmployeeID: ++empId,
    name: event.target.name.value,
    salary: event.target.salary.value,
    team: event.target.team.value,
    role: event.target.role.value,
    companyname: event.target.companyname.value
}
  
    employeeNewRecord(employee);

   
    submitForm.reset();
}

function deleteRow(event){
    let buttonDelete = event.target;
    let rowDelete = buttonDelete.parentNode.parentNode;
    rowDelete.remove();

 
    let currentEmployeeId = parseInt(buttonDelete.getAttribute("data-EmpId"));

    for(i=0; i<employeeList.length; i++)
    {
        if(employeeList[i].EmployeeID === currentEmployeeId)
        {
            employeeList.splice(i,1);
            break;
        }
    }

}
function fillFormWithData(employee)
{
    for(let key in employee )
    {
        if(key !== "EmployeeID")
        {
            submitForm.querySelector(`[name="${key}"]`).value = employee[key];
        }
    }

    if (formState === "CREATE") {
        createButton.innerText = "Update Employee";
        formState = "UPDATE";
    } else {
        createButton.innerText = "Create Employee";
        formState = "CREATE";
    }
}


function editRow(event) {
    let buttonEdit = event.target;

    // Use parseInt with radix 10 to ensure decimal (base-10) conversion
    let currentEmployeeId = parseInt(buttonEdit.getAttribute("data-EmpId"), 10);

    // Check if currentEmployeeId is a valid number
    if (!isNaN(currentEmployeeId)) {
        for (let i = 0; i < employeeList.length; i++) {
            if (employeeList[i].EmployeeID === currentEmployeeId) {
                fillFormWithData(employeeList[i]);
            break;
            }
        }
    } else {
        console.error("Invalid EmployeeID");
    }
}

function employeeNewRecord(employee){
    
    let newRow = document.createElement("tr");

    for(let key in employee){
        let newCell = document.createElement("td");
        newCell.innerText = employee[key];
        newRow.appendChild(newCell);

    }
    
    let newCell2 = document.createElement("td");
    let newCell3 = document.createElement("td");

    let editIcon = document.createElement("span");
    editIcon.className = "material-icons icon1";
    editIcon.innerText = "edit";
   editIcon.addEventListener("click", editRow);
   editIcon.setAttribute("data-EmpId", employee.EmployeeID)

    
    let deleteIcon = document.createElement("span");
    deleteIcon.className = "material-icons icon2";
    deleteIcon.innerText = "delete";
   deleteIcon.addEventListener("click",deleteRow);
   deleteIcon.setAttribute("data-EmpId", employee.EmployeeID)

    newCell2.appendChild(editIcon);
    newCell3.appendChild(deleteIcon);

    newRow.appendChild(newCell2);
    newRow.appendChild(newCell3);


    recordContainer.appendChild(newRow);

    employeeList.push(employee);
}


