const buttonContainer = document.querySelector('#button_container');

function createButtons() {
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.innerText = "Edit";
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerText = "Delete";
    buttonContainer.appendChild(deleteButton);
};

createButtons();