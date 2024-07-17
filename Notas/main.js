let notes = [
    { id: 1, title: "Comer", text: "Quedó comida de ayer", realizada: true },
    { id: 2, title: "Estudiar eventos", text: "Estoy flojo de papeles y no voy a aprobar la tarea 3", realizada: false },
    { id: 3, title: "Sacar la basura", text: "Mi mamá me va a retar si no lo hago", realizada: false },
    { id: 4, title: "Tomar agua", text: "Debo hidratarme bien para no desmayarme", realizada: true }
];
let idGlobal = 4;

// Función para renderizar las notas en la interfaz de usuario
function renderNotes(filteredNotes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    // Mostrar un mensaje si no hay notas para mostrar
    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    // Ordenar las notas alfabéticamente por título
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));

    // Iterar sobre cada nota y crear elementos HTML para mostrarlas
    filteredNotes.forEach(function (note) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        // Agregar una clase adicional si la nota está marcada como realizada
        if (note.realizada) {
            noteElement.classList.add('note-realizada');
        }
        // Construir el HTML de la nota con título, contenido y acciones
        noteElement.innerHTML = '<div class="content">' +
            '<h2><input type="checkbox" onclick="toggleDone(' + note.id + ')" ' + (note.realizada ? 'checked' : '') + '>' + note.title + '</h2>' +
            '<p>' + note.text + '</p>' +
            '</div>' +
            '<div class="actions">' +
            '<button onclick="deleteNote(' + note.id + ')">Borrar nota</button>' +
            '</div>';
        // Agregar la nota al contenedor principal
        notesContainer.appendChild(noteElement);
    });
}

// Función para agregar una nueva nota
function addNote() {
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;

    // Verificar que los campos de título y texto no estén vacíos
    if (!title || !text) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    // Incrementar el ID global y crear una nueva nota
    idGlobal++;
    const newNote = { id: idGlobal, title: title, text: text, realizada: false };
    notes.push(newNote);
    // Aplicar filtros y limpiar campos después de agregar la nota
    applyFilters();
    clearFields();
}

// Función para limpiar los campos de entrada de título y texto
function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';
}

// Función para eliminar una nota según su ID
function deleteNote(id) {
    notes = notes.filter(function (note) {
        return note.id !== id;
    });
    // Aplicar filtros después de eliminar la nota
    applyFilters();
}

// Función para cambiar el estado de realizada/no realizada de una nota
function toggleDone(id) {
    const note = notes.find(function (note) {
        return note.id === id;
    });
    note.realizada = !note.realizada;
    // Renderizar las notas actualizadas después de cambiar el estado
    renderNotes(notes);
}

// Función para aplicar filtros de búsqueda y estado a la lista de notas
function applyFilters() {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const filterDone = document.getElementById('filterDone').checked;

    let filteredNotes = notes;

    // Filtrar notas por texto de título o contenido
    if (searchText) {
        filteredNotes = filteredNotes.filter(function (note) {
            return note.title.toLowerCase().includes(searchText) || note.text.toLowerCase().includes(searchText);
        });
    }

    // Filtrar notas por estado de realizada/no realizada
    if (filterDone) {
        filteredNotes = filteredNotes.filter(function (note) {
            return note.realizada;
        });
    }

    // Renderizar las notas filtradas en la interfaz de usuario
    renderNotes(filteredNotes);
}

// Inicializar la aplicación mostrando las notas iniciales y aplicando filtros
applyFilters();