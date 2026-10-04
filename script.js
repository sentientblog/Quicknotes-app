const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];

function render(notesToDisplay = notes) {
    notesList.textContent = "";

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

    const note = {
        id: Date.now(),
        text: noteInput.value,
        category: noteCategory.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);
    render();

    noteInput.value = "";
});