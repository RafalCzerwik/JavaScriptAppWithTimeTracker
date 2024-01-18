const apikey = '20ab0160-3b1f-4179-89a9-1684255870ef';
const apihost = 'https://todo-api.coderslab.pl';

// apikey = {"error":false,"data":{"apiKey":"20ab0160-3b1f-4179-89a9-1684255870ef"}}

function apiListTasks() {
    return fetch(
        apihost + '/api/tasks',
        {
            headers: { Authorization: apikey }
        }
    ).then(
        function(resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
};

function apiListOperationsForTask(taskId) {
    return fetch(
        apihost + '/api/tasks/' + taskId + '/operations',
        {
            headers: { Authorization: apikey }
        }
    ).then(
        function(resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
};

function apiCreateTask(title, description) {
    return fetch(
        apihost + '/task/tasks',
        {
            headers: { Authorization: apikey, 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, status: 'open'}),
            method: 'POST'
        }
    ).then(
        function(resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
};

function apiDeleteTask(taskId) {
    return fetch(
        apihost + '/api/tasks/' + taskId,
        {
            headers: { Authorization: apikey },
            method: 'DELETE'
        }
    ).then(
        function(resp) {
            if(!resp.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network i poszukaj przyczyny');
            }
            return resp.json();
        }
    )
};

function renderTask(taskId, title, description, status) {
    const section = document.createElement("section");
    section.className = 'card mt-5 shadow-sm';
    document.querySelector('main').appendChild(section);

    const headerDiv = document.createElement('div');
    headerDiv.className = 'card-header d-flex justify-content-between align-items-center';
    section.appendChild(headerDiv);

    const headerLeftDiv = document.createElement('div');
    headerDiv.appendChild(headerLeftDiv);

    const h5 = document.createElement('h5');
    h5.innerText = title;
    headerLeftDiv.appendChild(h5);

    const h6 = document.createElement('h6');
    h6.className = 'card-subtitle text-muted';
    h6.innerText = description;
    headerLeftDiv.appendChild(h6);

    const headerRightDiv = document.createElement('div');
    headerDiv.appendChild(headerRightDiv);

    if(status === 'open') {
        const finishButton = document.createElement('button');
        finishButton.className = 'btn btn-dark btn-sm js-task-open-only';
        finishButton.innerText = 'Finish';
        headerRightDiv.appendChild(finishButton);
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn=sm ml-2';
    deleteButton.innerText = 'Delete';
    headerRightDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
        apiDeleteTask(taskId).then(
            function() {
                section.parentElement.removeChild(section);
            }
        );
    });

    const ul = document.createElement('ul');
    ul.className = 'list-group list group-flush';
    section.appendChild(ul);

    apiListOperationsForTask(taskId).then(
        function(response) {
            response.data.forEach(
                function(operation) {
                    renderOperation(ul, status, operation.id, operation.description, operation.timeSpent);
                }
            )
        }
    )

    if(status === 'open') {
        const addOperationDiv = document.createElement('div');
        addOperationDiv.className = 'card-body js-task-open-only';
        section.appendChild(addOperationDiv);

        const form = document.createElement('form');
        addOperationDiv.appendChild(form);

        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        form.appendChild(inputGroup);

        const descriptionInput = document.createElement('input');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.setAttribute('placeholder', 'Operation description');
        descriptionInput.setAttribute('minlength', '5');
        descriptionInput.className = 'form-control';
        inputGroup.appendChild(descriptionInput);

        const inputGroupAppend = document.createElement('div');
        inputGroupAppend.className = 'input-group-append';
        inputGroup.appendChild(inputGroupAppend);

        const addButton = document.createElement('button');
        addButton.className = 'btn btn-info';
        addButton.innerText = 'Add';
        inputGroupAppend.appendChild(addButton);
    }


};

function renderOperation(operationList, status, operationId, operationDescription, timeSpent) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    operationList.appendChild(li);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.innerText = operationDescription;
    li.appendChild(descriptionDiv);

    const time = document.createElement('span');
    time.className = 'badge badge-success badge-pill ml-2';
    time.innerText = timeSpent + 'm';
    descriptionDiv.appendChild(time);

    if(status === 'open') {
        const controlDiv = document.createElement('div');
        controlDiv.className = 'js-task-open-only';
        li.appendChild(controlDiv);

        const add15minButton = document.createElement('button');
        add15minButton.className = 'btn btn-outline-success btn-sm mr-2';
        add15minButton.innerText = '+15min';
        controlDiv.appendChild(add15minButton);

        const add1hButton = document.createElement('button');
        add1hButton.className = 'btn btn-outline-success btn-sm mr-2';
        add1hButton.innerText = '+1hour';
        controlDiv.appendChild(add1hButton);

        const delButton = document.createElement('button');
        delButton.className = 'btn btn-outline-success btn-sm mr-2';
        delButton.innerText = 'Delete';
        controlDiv.appendChild(delButton); 
    }
};

function formatTime(timeSpent) {
    const hours = Math.floor(timeSpent / 60);
    const minutes = timeSpent % 60;
    if(hours > 0) {
        return hours + 'h ' + minutes + 'm';
    } else {
        return minutes + 'm';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    apiListTasks().then(
        function(response) {
            response.data.forEach(
                function(task) {
                    renderTask(task.id, task.title, task.description, task.status); 
                }
            );
        }
    );
    document.querySelector('.js-task-adding-form').addEventListener('submit', function(event) {
        event.preventDefault();
        apiCreateTask(event.target.elements.title.value, event.target.elements.description.value).then(
          function(response) { 
            renderTask(response.data.id, response.data.title, response.data.description, response.data.status); }
        )
      });
    });