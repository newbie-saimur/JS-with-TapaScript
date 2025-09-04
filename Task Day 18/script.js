// Task 1. Create a form dynamically using JavaScript and manipulate its behavior

let alreadyCreated = {
    name : false,
    email: false,
    message: false
}

let showLog = {
    name: "",
    email: "",
    message: ""
}

let elementCount = 0;

document.getElementById('select-input-fields').addEventListener('click', () => {
    let type = prompt("Type a input filed type for your form. Name, email or Message");
    type = type.toLowerCase();
    if(type != "name" && type != "email" && type != "message") {
        alert("Invalid type selected! Try Again!");
        return;
    }
    if(alreadyCreated[type]) {
        alert("Already added this type of input field.");
        return;
    }
    alreadyCreated[type] = true;
    type = type[0].toUpperCase() + type.slice(1);

    const inputContainerElem = document.getElementById('input-fields-container');
    const inputDivElem = document.createElement('div');
    inputContainerElem.appendChild(inputDivElem);

    const labelElem = document.createElement('label');
    labelElem.classList.add("input-label");
    labelElem.textContent = type;
   
    let inputElem = document.createElement('input');
    inputElem.setAttribute("type", `${type == "Email" ? "email" : "text"}`);
    inputElem.setAttribute("name", `${type}`);
    inputElem.setAttribute("placeholder",`Enter your ${type} Here...`);
    inputElem.classList.add('inputField');
    inputElem.setAttribute("id",`form${type}Input`);


    inputDivElem.appendChild(labelElem);
    inputDivElem.appendChild(inputElem);

    document.getElementById('form-btn-container').style.display = "block";
    elementCount++;
    if(elementCount == 3) document.getElementById('select-input-fields').disabled = true;
});

document.getElementById('reset-btn').addEventListener('click', () => {
    for(const type in alreadyCreated) {
        if(alreadyCreated[type]) {
            let typeId = `form${type[0].toUpperCase()+type.slice(1)}Input`;
            document.getElementById(typeId).value = "";
        }
    }
});

document.getElementById('submit-btn').addEventListener('click', () => {
    for(const type in alreadyCreated) {
        if(alreadyCreated[type]) {
            let typeId = `form${type[0].toUpperCase()+type.slice(1)}Input`;
            showLog[type] = document.getElementById(typeId).value;
            if(showLog[type] == "") {
                alert("One or more input fields are missing.");
                return;
            }
        }
    }
    console.log("Your Form Details:");
    for(const type in showLog) {
        if(alreadyCreated[type]) {
            console.log(`${type[0].toUpperCase() + type.slice(1)} : ${showLog[type]}`);
        }
    }
});

document.getElementById('reset-form').addEventListener('click', () => {
    document.getElementById('input-fields-container').innerHTML = "";
    document.getElementById('form-btn-container').style.display = "none";
    for(const type in alreadyCreated) {
        alreadyCreated[type] = false;
    }
})


// Task 2. Add, delete, and search rows in a dynamic table
const table = document.getElementById('input-table');
const tbody = document.getElementById('input-tbody');

document.getElementById('add-form').addEventListener("submit", (event) => {
    event.preventDefault();
    const row = tbody.insertRow(-1);
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const role = document.getElementById('role').value;

    if(name == "") return;

    const button = document.createElement('button');
    button.textContent = "Delete";
    button.classList.add('delete-btn');
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = age;
    row.insertCell(2).textContent = role;
    row.insertCell(3).appendChild(button);

    document.getElementById('add-form').reset();
});

tbody.addEventListener('click', (event) => {
    if(event.target.matches('.delete-btn')) {
        table.deleteRow(event.target.closest('tr').rowIndex);
    }
})

document.getElementById('search-by').addEventListener('keyup', () => {
    const text = document.getElementById('search-by').value.trim().toLowerCase();
    for(const row of tbody.rows) {
        const name = row.cells[0].textContent.toLowerCase();
        row.style.display = name.includes(text) ? "" : "none";
    }
});


// Task 3. Theme Switcher with Persistence

const themeButton = document.getElementById('theme-switch');

themeButton.addEventListener('click', () => {
    if(themeButton.textContent == "🌙 Dark") {
        document.body.classList.replace("light-theme", "dark-theme");
        themeButton.textContent = "☀️ Light";
        for(const row of tbody.rows) {
            row.style.color = "#0F172A";
        }
    }
    else {
        document.body.classList.replace("dark-theme", "light-theme");
        themeButton.textContent = "🌙 Dark";
    }
})