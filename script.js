const createBtn = document.getElementById("create");
const notesContainer = document.getElementById("notes-container");
const themeToggle = document.getElementById("theme-toggle");

const loadTheme = () => {
  const dark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark", dark);
  themeToggle.innerText = dark ? "☀️" : "🌙";
};

const toggleTheme = () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerText = isDark ? "☀️" : "🌙";
};

themeToggle.addEventListener("click", toggleTheme);


window.onload = () => {
  loadTheme();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(({ text, date }) => addNote(text, date));
};


function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note").forEach(note => {
    const text = note.querySelector(".text").innerText.trim();
    const date = note.querySelector(".date").innerText;
    notes.push({ text, date });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}


function addNote(text = "", dateStr = "") {
  const note = document.createElement("div");
  note.className = "note";

  const date = document.createElement("div");
  date.className = "date";
  date.innerText = dateStr || new Date().toLocaleString();

  const content = document.createElement("div");
  content.className = "text";
  content.contentEditable = true;
  content.innerText = text;

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "delete.png";
  deleteIcon.alt = "Delete";
  deleteIcon.addEventListener("click", () => {
    if (confirm("Delete this note?")) {
      note.remove();
      saveNotes();
    }
  });

  content.addEventListener("input", saveNotes);

  note.appendChild(date);
  note.appendChild(content);
  note.appendChild(deleteIcon);

  notesContainer.prepend(note);
  saveNotes();
}

createBtn.addEventListener("click", () => addNote());
