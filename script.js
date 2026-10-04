const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}

function render(notesToDisplay = notes) {
    notesList.textContent = "";

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }

    if (notesToDisplay.length === 0 && notes.length > 0) {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
        return;
    }

    notesToDisplay.forEach(note => {
        const li = document.createElement("li");
        li.classList.add("note", `category-${note.category}`);

        const text = document.createElement("p");
        text.textContent = note.text;

        const category = document.createElement("span");
        category.classList.add("category-label");
        category.textContent = note.category;

        const date = document.createElement("small");
        date.classList.add("note-date");
        date.textContent = note.createdAt;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            notes = notes.filter(item => item.id !== note.id);
            saveNotes();
            render();
        });

        li.appendChild(text);
        li.appendChild(category);
        li.appendChild(document.createElement("br"));
        li.appendChild(date);
        li.appendChild(document.createElement("br"));
        li.appendChild(deleteButton);

        notesList.appendChild(li);
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();

    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent = "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const note = {
        id: Date.now(),
        text: text,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    saveNotes();
    render();

    noteInput.value = "";
});

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchText)
    );

    render(filteredNotes);
});

render();