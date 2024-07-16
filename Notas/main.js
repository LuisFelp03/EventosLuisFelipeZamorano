let notes = [
    { id: 1, title: "Comer", text: "Quedó comida de ayer", realizada: true },
    { id: 2, title: "Estudiar eventos", text: "Estoy flojo de papeles y no voy a aprobar la task 3", realizada: false },
    { id: 3, title: "Sacar la basura", text: "Mi mamá me va a retar si no lo hago", realizada: false },
    { id: 4, title: "Tomar agua", text: "Debo hidratarme bien para no desmayarme", realizada: true }
];
let idGlobal = 4;

/* Mostrar en la interfaz de usuario la lista de notas que recibe como parámetro */
function renderNotes(filteredNotes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));

    filteredNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = `note ${note.realizada ? 'note-realizada' : ''}`;
        noteElement.innerHTML = `
            <div class="content">
                <h2>
                    <input type="checkbox" onclick="toggleDone(${note.id})" ${note.realizada ? 'checked' : ''}>
                    ${note.title}
                </h2>
                <p>${note.text}</p>
            </div>
            <div class="actions">
                <button onclick="deleteNote(${note.id})">Borrar nota</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

/* Agregar nota */
function addNote() {
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;

    if (!title || !text) {
        alert('Por favor, rellena todos los campos');
        return;
    }

    idGlobal++;
    const newNote = { id: idGlobal, title, text, realizada: false };
    notes.push(newNote);
    applyFilters();
    clearFields();
}

/* Limpiar campos */
function clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';
}

/* Borrar nota */
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    applyFilters();
}

/* Marcar nota como realizada */
function toggleDone(id) {
    const note = notes.find(note => note.id === id);
    note.realizada = !note.realizada;
    applyFilters();
}

/* Aplicar filtros a la lista de notas */
function applyFilters() {
    const searchText = document.getElementById('searchText').value.toLowerCase();
    const filterDone = document.getElementById('filterDone').checked;

    let filteredNotes = notes;

    if (searchText) {
        filteredNotes = filteredNotes.filter(note => note.title.toLowerCase().includes(searchText) || note.text.toLowerCase().includes(searchText));
    }

    if (filterDone) {
        filteredNotes = filteredNotes.filter(note => note.realizada);
    }

    renderNotes(filteredNotes);
}

// Inicializar con las notas existentes
applyFilters();