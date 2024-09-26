// Cuando el documento ha sido cargado, se muestran las notas guardadas
document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
});

// Agrega una nueva nota cuando se presiona el botón "Agregar Nota"
document.getElementById('addNoteBtn').addEventListener('click', function () {
    const noteInput = document.getElementById('noteInput'); // Obtenemos el valor del input
    const noteText = noteInput.value.trim(); // Eliminamos espacios en blanco

    // Si el texto de la nota no está vacío, la agregamos
    if (noteText !== '') {
        addNoteToLocalStorage(noteText); // Guardamos la nota en el almacenamiento local
        displayNotes(); // Actualizamos la lista de notas
        noteInput.value = ''; // Limpiamos el input
    }
});

// Función para agregar la nota al almacenamiento local
function addNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || []; // Obtenemos las notas previas o un array vacío
    notes.push(note); // Añadimos la nueva nota al array
    localStorage.setItem('notes', JSON.stringify(notes)); // Guardamos el array actualizado en localStorage
}

// Función para mostrar todas las notas en la página
function displayNotes() {
    const noteList = document.getElementById('notesList'); // Obtenemos la lista donde se mostrarán las notas
    noteList.innerHTML = '';  // Limpiamos la lista para evitar duplicados

    let notes = JSON.parse(localStorage.getItem('notes')) || []; // Obtenemos las notas del almacenamiento local

    // Recorremos cada nota y la mostramos en la lista
    notes.forEach(function (note, index) {
        const newNote = document.createElement('li'); // Creamos un nuevo item para la nota
        newNote.className = 'list-group-item'; // Le añadimos la clase de Bootstrap

        // Añadimos el texto de la nota y un botón para eliminarla
        newNote.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        `;

        // Evento para eliminar la nota cuando se presiona el botón "X"
        newNote.querySelector('.delete-btn').addEventListener('click', function () {
            deleteNoteFromLocalStorage(index); // Eliminamos la nota del almacenamiento local
            displayNotes(); // Actualizamos la lista
        });

        // Añadimos el item a la lista visible en la página
        noteList.appendChild(newNote);
    });
}

// Función para eliminar una nota del almacenamiento local
function deleteNoteFromLocalStorage(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || []; // Obtenemos las notas del almacenamiento local
    notes.splice(index, 1); // Eliminamos la nota en la posición correspondiente
    localStorage.setItem('notes', JSON.stringify(notes)); // Guardamos el array actualizado
}
